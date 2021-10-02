import React, { useCallback } from "react";
import {
  CollapseIconsWrapper,
  TableBodyRow as StyledTableBodyRow,
} from "./styles";
import { Table } from "./Table";
import { TableBodyCell } from "./TableBodyCell";
import { SubTableOptions, TableColumn } from "./types";

type Props<T> = {
  row: T;
  columns: TableColumn<T>[];
  toggleCollapsedRow: () => void;
  collapsed: boolean;
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: T
  ) => void;
  subTableOptions?: SubTableOptions<T>;
};

function CTableBodyRow<T>({
  row,
  columns,
  toggleCollapsedRow,
  collapsed,
  onRowClick,
  subTableOptions,
}: Props<T>) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) =>
      onRowClick?.(e, row),
    [onRowClick, row]
  );

  return (
    <>
      <StyledTableBodyRow
        onClick={handleClick}
        hasClickHandler={Boolean(onRowClick)}
      >
        {subTableOptions && (
          <TableBodyCell
            onClick={(e) => {
              e.stopPropagation();
              toggleCollapsedRow();
            }}
            column={{
              field: "arrow" as "",
              width: "2rem",
              noPadding: true,
              formatter: () => (
                <CollapseIconsWrapper>
                  {collapsed ? <div>right</div> : <div>down</div>}
                </CollapseIconsWrapper>
              ),
            }}
            row={row}
            index={-1}
            value={null}
          />
        )}
        {columns.map((column, index) => (
          <TableBodyCell
            key={index}
            column={column}
            row={row}
            index={index}
            value={column.field ? row[column.field] : null}
          />
        ))}
      </StyledTableBodyRow>
      {subTableOptions && !collapsed && (
        <Table
          columns={subTableOptions.columns}
          data={(row as any)[subTableOptions.field]}
          subTableOptions={subTableOptions.subTableOptions}
          noTableHead={subTableOptions.noTableHead}
          onRowClick={subTableOptions.onRowClick}
          isSubTable
        />
      )}
    </>
  );
}

export const TableBodyRow = React.memo(CTableBodyRow) as typeof CTableBodyRow;
