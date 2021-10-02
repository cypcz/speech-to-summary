import React, { useCallback, useMemo, useState } from "react";
import { TableBody as StyledTableBody } from "./styles";
import { TableBodyRow } from "./TableBodyRow";
import { SubTableOptions, TableColumn } from "./types";

type Props<T, K extends Extract<keyof T, string> = Extract<keyof T, string>> = {
  columns: TableColumn<T>[];
  keyField?: K;
  data: T[];
  onRowClick?: (
    e: React.MouseEvent<HTMLTableRowElement, MouseEvent>,
    row: T
  ) => void;
  subTableOptions?: SubTableOptions<T>;
};

function CTableBody<T>({
  columns,
  data,
  keyField,
  onRowClick,
  subTableOptions,
}: Props<T>) {
  const [collapsedRowIds, setCollapsedRowIds] = useState<number[]>([]);

  const toggleCollapsed = useCallback(
    (id: number) => {
      const updatedCollapsedRowIds = collapsedRowIds.includes(id)
        ? collapsedRowIds.filter((i) => i !== id)
        : [...collapsedRowIds, id];

      setCollapsedRowIds(updatedCollapsedRowIds);
    },
    [collapsedRowIds]
  );

  const tableRows = useMemo(
    () =>
      data.map((row, index) => (
        <TableBodyRow
          onRowClick={onRowClick}
          row={row}
          columns={columns}
          toggleCollapsedRow={() => {
            if (!keyField) {
              return console.error(
                "Please provide `keyField` to enable row collapse."
              );
            }

            toggleCollapsed(row[keyField] as any);
          }}
          collapsed={Boolean(
            keyField && collapsedRowIds.includes(row[keyField] as any)
          )}
          key={keyField ? (row[keyField] as any) : index}
          subTableOptions={subTableOptions}
        />
      )),
    [
      columns,
      data,
      keyField,
      onRowClick,
      subTableOptions,
      collapsedRowIds,
      toggleCollapsed,
    ]
  );

  return <StyledTableBody>{tableRows}</StyledTableBody>;
}

export const TableBody = React.memo(CTableBody) as unknown as typeof CTableBody;
