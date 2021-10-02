import React from "react";
import { TableBodyCell as StyledTableBodyCell } from "./styles";
import { TableColumn } from "./types";

type Props<T> = {
  row: T;
  value: any;
  column: TableColumn<T>;
  index: number;
  isCursorPointer?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function CTableBodyCell<T = any>({
  row,
  column,
  value,
  index,
  isCursorPointer,
  onClick,
}: Props<T>) {
  return (
    <StyledTableBodyCell
      onClick={onClick}
      align={column.align}
      width={column.width}
      noPadding={column.noPadding}
      noVerticalPadding={column.noVerticalPadding}
      flex={column.flex}
      minWidth={column.minWidth}
      isCursorPointer={isCursorPointer}
    >
      {column.formatter ? column.formatter(value, row, index) : value}
    </StyledTableBodyCell>
  );
}

export const TableBodyCell = React.memo(
  CTableBodyCell
) as typeof CTableBodyCell;
