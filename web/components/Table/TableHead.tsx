import * as React from "react";
import styled from "styled-components";
import {
  TableHead as StyledTableHead,
  TableHeaderCell,
  TableHeaderRow,
} from "./styles";
import { TableColumn, TableOrderType, TableSort } from "./types";

type Props<T, K extends Extract<keyof T, string> = Extract<keyof T, string>> = {
  onSortChange?: (field: K | "" | null) => void;
  sort?: TableSort<T>;
  sortable?: boolean;
  columns: Array<TableColumn<T>>;
  hideSortNotch?: boolean;
};

function CTableHead<T>({
  onSortChange,
  sort,
  columns,
  sortable,
  hideSortNotch,
}: Props<T>) {
  return (
    <StyledTableHead>
      <TableHeaderRow>
        {columns.map((column, index) => (
          <TableHeaderCell
            key={index}
            width={column.width}
            align={column.align}
            flex={column.flex}
            noPadding={column.noPadding}
            sortable={sortable}
            sortDirection={
              sortable && sort?.field === column.field ? sort.order : false
            }
            minWidth={column.minWidth}
            onClick={() =>
              sortable &&
              column.sortable !== false &&
              onSortChange?.(column.field)
            }
          >
            {sortable && column.sortable !== false ? (
              <TableSortLabel
                active={sort?.field === column.field}
                direction={sort?.order}
              >
                {column.title}
                {!hideSortNotch && sort?.field === column.field && (
                  <>
                    {sort.order === "desc" ? <div>desc</div> : <div>asc</div>}
                  </>
                )}
              </TableSortLabel>
            ) : (
              column.title
            )}
          </TableHeaderCell>
        ))}
      </TableHeaderRow>
    </StyledTableHead>
  );
}

type TableSortLabelProps = {
  active: boolean;
  direction?: TableOrderType;
  children: React.ReactNode;
};

const TableSortLabel = ({ children }: TableSortLabelProps) => {
  return <SortLabel>{children}</SortLabel>;
};

export const TableHead = React.memo(CTableHead) as typeof CTableHead;

const SortLabel = styled.div`
  display: flex;
  height: 100%;
`;
