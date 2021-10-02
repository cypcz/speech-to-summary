import * as React from "react";
import { TableBody } from "./styles";
import { TableSkeletonBodyRow } from "./TableSkeletonBodyRow";
import { TableColumn } from "./types";

type Props<T> = {
  columns: TableColumn<T>[];
  numberOfSkeletons: number;
};

function CTableSkeletonBody<T = any>({ columns, numberOfSkeletons }: Props<T>) {
  return (
    <TableBody>
      {[...Array(numberOfSkeletons)].map((_, index) => (
        <TableSkeletonBodyRow columns={columns} key={index} />
      ))}
    </TableBody>
  );
}

export const TableSkeletonBody = React.memo(
  CTableSkeletonBody
) as typeof CTableSkeletonBody;
