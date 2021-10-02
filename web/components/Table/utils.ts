import {
  TableColumn,
  TableComparatorReturnType,
  TableSort,
  TableSortFunction,
} from "./types";

export function getSortedPaginatedData<T>(
  data: T[],
  model: TableColumn<T>[],
  pagination?: { page: number; pageSize: number } | null | false,
  sort?: TableSort<T> | null | false
): T[] {
  let rows = sort ? stableSort(data, model, sort) : data;

  if (pagination) {
    rows = rows.slice(
      pagination.page * pagination.pageSize,
      pagination.page * pagination.pageSize + pagination.pageSize
    );
  }

  return rows;
}

export function stableSort<T>(
  data: T[],
  model: TableColumn<T>[],
  sort?: TableSort<T>
): T[] {
  if (!sort || !sort.field) {
    return data;
  }

  const stabilizedThis = data.map((el, index) => ({ el, index }));
  const customSortFunc = model.find(
    (column) => column.field === sort.field
  )?.sortFunc;
  const sortFunc = getFieldSortFunction(
    sort.field,
    customSortFunc || stringComparator
  );
  const sortOperator = sort.order === "desc" ? 1 : -1;

  stabilizedThis.sort((a, b) => {
    const orderResult = sortFunc(a.el, b.el);

    if (orderResult !== 0) {
      return orderResult * sortOperator;
    }

    return a.index - b.index;
  });

  return stabilizedThis.map((el) => el.el);
}

export function getFieldSortFunction<T, K extends keyof T = keyof T>(
  field: K,
  sortFunc: TableSortFunction<T[K], T>
) {
  return (a: T, b: T) => sortFunc(a[field], b[field], a, b);
}

export function stringComparator(
  a: unknown,
  b: unknown
): TableComparatorReturnType {
  if (!a && !b) {
    return 0;
  }

  if (!a) {
    return -1;
  }

  if (!b) {
    return 1;
  }

  if (typeof a === "number" && typeof b === "number") {
    return a - b;
  }

  return JSON.stringify(a).localeCompare(JSON.stringify(b));
}

export function numberComparator(
  a: number,
  b: number
): TableComparatorReturnType {
  if (b < a) {
    return -1;
  }

  if (b > a) {
    return 1;
  }

  return 0;
}

export function timestampDateFormatter(value: number) {
  const date = new Date(Number(value));

  return Number(value) === 0
    ? ""
    : `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

export const getSearchableOptions = <T>(columns: TableColumn<T>[]) =>
  columns.reduce(
    (prev, curr, i) => {
      if (curr.searchable && !!curr.field?.length) {
        return {
          searchPlaceholder:
            prev.searchPlaceholder +
            (i === 0
              ? curr.title?.toString().toLocaleLowerCase()
              : `, ${curr.title?.toString().toLocaleLowerCase()}`),
          searchableColumnKeys: [...prev.searchableColumnKeys, curr.field],
        };
      }

      return prev;
    },
    { searchPlaceholder: "Search ", searchableColumnKeys: [] as string[] }
  );
