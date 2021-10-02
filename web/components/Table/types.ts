import { CSSProperties, ReactNode } from "react";

export type TableOrderType = "desc" | "asc";
export type TableCellAlign = "left" | "center" | "right";
export type TableComparatorReturnType = number;
export type TableSortFunction<CellType, RowType> = (
  a: CellType,
  b: CellType,
  aRow: RowType,
  bRow: RowType
) => TableComparatorReturnType;

export type TableSort<
  T = unknown,
  K extends Extract<keyof T, string> = Extract<keyof T, string>
> = {
  field: K | "" | null;
  order: TableOrderType;
};

export type TableColumnCallback<T, R, K extends keyof T = keyof T> = (
  cell: T[K],
  row: T,
  index: number
) => R;

export type TableColumn<
  T = unknown,
  K extends Extract<keyof T, string> = Extract<keyof T, string>
> = {
  /** Field to use on targeted entity */
  field: K | "" | null;

  /** Column header title */
  title?: ReactNode;

  /** Table body cell value align */
  align?: TableCellAlign;

  /** Column width */
  width?: string | number;

  /** Is this column sortable */
  sortable?: boolean;

  /** Custom sortable function if you don't want to use default string comparison */
  sortFunc?: TableSortFunction<T[K], T>;

  /** Custom formatter for incoming value */
  formatter?: TableColumnCallback<T, React.ReactNode, K>;

  noPadding?: boolean;

  noVerticalPadding?: boolean;

  flex?: number;

  /** The column is completely omitted from the data */
  shouldOmit?: boolean;

  /** Used with table prop 'scrollXAtBreakpoint' for horizontal scrolling to manipulate the min-width of the column when scroll is enabled */
  /** In rems e.g. '2rem' */
  minWidth?: string;

  searchable?: boolean;
};

export type TableProps<
  T,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
  SubKey extends Extract<keyof T, string> = Extract<keyof T, string>
> = {
  /** Data to display */
  data: T[];

  keyField?: K;

  /** Columns metadata model. This model describe how data will be shown */
  columns: TableColumn<T>[];

  className?: string;

  style?: CSSProperties;
  ariaLabel?: string;

  /** Is pagination enabled. Default is false. */
  pagination?: boolean;

  /** Default page. It can be used when you don't want to start at first (0) page. */
  defaultPage?: number;

  /**
   * If page is provided, then it will be switched to controllable state.
   * Parent component is then responsible for handling page prop and should provide necessary logic for it.
   */
  page?: number;

  /** This event is fired when page is changed. This event will be required if page prop is controlled. */
  onPageChange?: (newPage: number) => void;

  /** Default page size */
  defaultPageSize?: number;

  /**
   * If pageSize is provides, then it will be switched to controllable state.
   * Parent component is then responsible for handling pageSize prop and should provide necessary logic for it.
   */
  pageSize?: number;

  /** This event is fired when pageSize is changed. This event will be required if pageSize prop is controlled. */
  onPageSizeChange?: (newPageSize: number) => void;

  /** Array of page sizes which user will see in pagination component. */
  pageSizeOptions?: number[];

  /** Is sorting enabled. Default is false. */
  sortable?: boolean;

  /** Default sort */
  defaultSort?: TableSort<T>;

  /**
   * If sort is provided, then it will be switched to controllable state.
   * Parent component is then responsible for handling sort prop and should provide necessary logic for it.
   */
  sort?: TableSort<T>;

  /** This event is fired when sort is changed. This event will be required if sort prop is controlled. */
  onSortChange?: (sort: TableSort<T>) => void;

  infiniteScroll?: boolean;

  onScrollBottom?: () => void;

  loadingMessage?: string;
  loading?: boolean;
  loadingDots?: boolean;
  emptyMessage?: React.ReactNode;
  showEmptyHeader?: boolean;
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: T
  ) => void;

  skeletonLoading?: TableSkeletonLoading;

  noTableHead?: boolean;
  isSubTable?: boolean;
  subTableOptions?: SubTableOptions<T, SubKey>;

  hideSortNotch?: boolean;

  searchPlaceholder?: string;
};

export type TableSkeletonLoading = {
  enabled: boolean;
  initLoad?: number;
  nextPageLoad?: number;
};

export type SubTableOptions<
  Row,
  FieldKey extends Extract<keyof Row, string> = Extract<keyof Row, string>,
  SubRow = Row[FieldKey] extends Array<infer F> ? F : any
> = {
  field: FieldKey;
  columns: TableColumn<SubRow>[];
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: SubRow
  ) => void;
  subTableOptions?: SubTableOptions<SubRow>;
  noTableHead?: boolean;
};
