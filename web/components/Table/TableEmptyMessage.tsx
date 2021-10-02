import { TableBody, TableEmptyMessage as STableEmptyMessage } from "./styles";

type Props = {
  children: React.ReactNode;
};

export const TableEmptyMessage = ({ children }: Props) => {
  return (
    <TableBody>
      <STableEmptyMessage>{children}</STableEmptyMessage>
    </TableBody>
  );
};
