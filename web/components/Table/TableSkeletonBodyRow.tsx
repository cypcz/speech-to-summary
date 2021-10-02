import React from "react";
import { TableBodyRow } from "./styles";
import { TableSkeletonBodyCell } from "./TableSkeletonBodyCell";
import { TableColumn } from "./types";

type Props<T> = {
  columns: TableColumn<T>[];
};

function CTableSkeletonBodyRow<T = any>({ columns }: Props<T>) {
  return (
    <TableBodyRow>
      {columns.map((column, index) => (
        <TableSkeletonBodyCell key={index} column={column} />
      ))}
    </TableBodyRow>
  );
}

export const TableSkeletonBodyRow = React.memo(
  CTableSkeletonBodyRow
) as typeof CTableSkeletonBodyRow;
