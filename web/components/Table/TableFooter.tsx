import * as React from "react";
import styled from "styled-components";
import { DEFAULT_PAGE_OPTIONS, DEFAULT_PAGE_SIZE } from "./constants";
import { TableFooter as StyledTableFooter, TableFooterRow } from "./styles";

type Props = {
  pagination?: boolean;
  pageSize?: number;
  page?: number;
  pageSizeOptions?: number[];
  dataLength: number;
  onPageChange?: (newPageNumber: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
};

function CTableFooter({
  pagination,
  pageSize,
  page,
  dataLength,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}: Props) {
  if (!pagination) {
    return <></>;
  }

  const pSize = pageSize || DEFAULT_PAGE_SIZE;
  const pSizeOptions = pageSizeOptions || DEFAULT_PAGE_OPTIONS;

  return (
    <StyledTableFooter>
      <TableFooterRow>
        <TablePagination
          rowsPerPageOptions={pSizeOptions}
          count={dataLength}
          rowsPerPage={pSize}
          page={page}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </TableFooterRow>
    </StyledTableFooter>
  );
}

export const TableFooter = React.memo(CTableFooter) as typeof CTableFooter;

type TablePaginationProps = {
  rowsPerPageOptions: number[];
  count: number;
  rowsPerPage: number;
  page?: number;
  onPageChange?: (newPageNumber: number) => void;
  onPageSizeChange?: (newPageSize: number) => void;
};

const TablePagination = ({}: TablePaginationProps) => {
  return <PaginationWrapper>footer</PaginationWrapper>;
};

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 3rem;
`;
