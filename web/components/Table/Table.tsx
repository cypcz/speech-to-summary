import { useCallback, useEffect, useMemo, useState } from "react";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "./constants";
import { TableContainer, TableScrollControl } from "./styles";
import { TableBody } from "./TableBody";
import { TableEmptyMessage } from "./TableEmptyMessage";
import { TableFooter } from "./TableFooter";
import { TableHead } from "./TableHead";
import { TableSkeletonBody } from "./TableSkeletonBody";
import { TableProps } from "./types";
import { getSortedPaginatedData } from "./utils";

export function Table<
  T,
  K extends Extract<keyof T, string> = Extract<keyof T, string>,
  SubKey extends Extract<keyof T, string> = Extract<keyof T, string>
>({
  data,
  columns,
  keyField,
  pagination,
  defaultSort,
  defaultPageSize,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  infiniteScroll,
  onScrollBottom,
  defaultPage,
  ariaLabel,
  className,
  style,
  sort,
  sortable,
  pageSizeOptions,
  pageSize,
  page,
  loading,
  loadingMessage,
  loadingDots,
  emptyMessage,
  skeletonLoading,
  onRowClick,
  noTableHead,
  isSubTable,
  subTableOptions,
  showEmptyHeader,
  hideSortNotch,
  searchPlaceholder,
}: TableProps<T, K, SubKey>) {
  const [innerPageSize, setInnerPageSize] = useState(
    pageSize || defaultPageSize || DEFAULT_PAGE_SIZE
  );
  const [innerPage, setInnerPage] = useState(
    page || defaultPage || DEFAULT_PAGE
  );
  const [innerSort, setInnerSort] = useState(sort || defaultSort);

  const sanitizedColumns = useMemo(
    () => columns.filter((column) => !column.shouldOmit),
    [columns]
  );

  const innerData = useMemo(
    () =>
      getSortedPaginatedData(
        data ?? [],
        sanitizedColumns,
        pagination && {
          page: innerPage,
          pageSize: innerPageSize,
        },
        sortable && !sort && innerSort
      ),
    [
      innerPage,
      innerSort,
      innerPageSize,
      pagination,
      sortable,
      sanitizedColumns,
      sort,
      data,
    ]
  );

  useEffect(() => {
    setInnerPage(page || DEFAULT_PAGE);
  }, [page]);

  useEffect(() => {
    setInnerPageSize(pageSize || DEFAULT_PAGE_SIZE);
  }, [pageSize]);

  useEffect(() => {
    setInnerSort(sort || defaultSort);
  }, [sort, defaultSort]);

  useEffect(() => {
    if (!page) {
      setInnerPage(DEFAULT_PAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (!page) {
        setInnerPage(newPage);
      }

      onPageChange?.(newPage);
    },
    [page, onPageChange]
  );

  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setInnerPage(DEFAULT_PAGE);
      onPageChange?.(DEFAULT_PAGE);

      if (!pageSize) {
        setInnerPageSize(newPageSize);
      }

      onPageSizeChange?.(newPageSize);
    },
    [onPageChange, onPageSizeChange, pageSize]
  );

  const handleSortChange = useCallback(
    (field: K | "" | null) => {
      const isAsc = innerSort?.field === field && innerSort?.order === "asc";

      if (!sort) {
        setInnerSort({ order: isAsc ? "desc" : "asc", field });
      }

      onSortChange?.({ order: isAsc ? "desc" : "asc", field });
    },
    [sort, innerSort, onSortChange]
  );

  const getNumberOfSkeletons = () => {
    if (data.length) {
      return (
        skeletonLoading?.nextPageLoad ||
        pageSize ||
        defaultPageSize ||
        DEFAULT_PAGE_SIZE
      );
    }

    return (
      skeletonLoading?.initLoad ||
      pageSize ||
      defaultPageSize ||
      DEFAULT_PAGE_SIZE
    );
  };

  return (
    <TableScrollControl isSubTable={isSubTable}>
      <TableContainer
        className={className}
        style={style}
        aria-label={ariaLabel}
      >
        {!skeletonLoading?.enabled && loading && <div>loading...</div>}
        {!loading &&
          innerData &&
          (showEmptyHeader || !!innerData.length) &&
          !noTableHead && (
            <TableHead
              sortable={sortable}
              sort={innerSort}
              onSortChange={handleSortChange as any}
              columns={sanitizedColumns}
              hideSortNotch={hideSortNotch}
            />
          )}

        {skeletonLoading?.enabled && loading ? (
          <TableSkeletonBody
            columns={sanitizedColumns}
            numberOfSkeletons={getNumberOfSkeletons()}
          />
        ) : (
          <TableBody
            onRowClick={onRowClick}
            columns={sanitizedColumns}
            data={innerData}
            subTableOptions={subTableOptions}
            keyField={keyField}
          />
        )}

        {!loading && emptyMessage && (!innerData || !innerData.length) && (
          <TableEmptyMessage>{emptyMessage}</TableEmptyMessage>
        )}

        <TableFooter
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pagination={pagination}
          pageSize={innerPageSize}
          page={innerPage}
          pageSizeOptions={pageSizeOptions}
          dataLength={data?.length || 0}
        />
      </TableContainer>
    </TableScrollControl>
  );
}
