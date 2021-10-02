import * as React from "react";
import { TableBodyCell } from "./styles";
import { TableColumn } from "./types";

type Props<T> = {
  column: TableColumn<T>;
  className?: string;
};

function CTableSkeletonBodyCell<T = any>({ column, className }: Props<T>) {
  return (
    <TableBodyCell className={className} align={column.align}>
      skeleton
    </TableBodyCell>
  );
}

export const TableSkeletonBodyCell = React.memo(
  CTableSkeletonBodyCell
) as typeof CTableSkeletonBodyCell;
