import { lighten, transparentize } from "polished";
import styled, { css } from "styled-components";
import { TableCellAlign, TableOrderType } from "./types";

export const alignToJustify = {
  left: "flex-start",
  center: "center",
  right: "flex-end",
};

export const TableScrollControl = styled.div<{ isSubTable?: boolean }>`
  ${({ isSubTable }) =>
    isSubTable &&
    css`
      margin-left: 4rem;
    `}
`;

export const TableContainer = styled.div`
  svg {
    flex: 0 0 auto;
  }
`;

export const TableSearchContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

export const TableHeaderRow = styled.div`
  display: flex;
  content: "";
  border-bottom: 1px solid
    ${({ theme }) => transparentize(0.92, theme.colors.secondary)};
  border-top: 1px solid
    ${({ theme }) => transparentize(0.92, theme.colors.secondary)};
  background: ${({ theme }) => transparentize(0.9725, theme.colors.secondary)};
`;

export const TableHeaderCell = styled.div<{
  flex?: number;
  width?: string | number;
  align?: TableCellAlign;
  noPadding?: boolean;
  sortable?: boolean;
  sortDirection?: TableOrderType | false;
  minWidth?: string;
}>`
  flex: ${({ flex }) => flex ?? 0};
  min-width: ${({ width }) => width ?? "auto"};
  justify-content: ${({ align }) => alignToJustify[align ?? "left"]};
  line-height: 1;
  padding: ${({ noPadding }) => (noPadding ? "0" : "1rem 1.25rem")};
  cursor: ${({ sortable }) => (sortable ? "pointer" : "auto")};
  display: flex;
  align-content: center;
  text-transform: uppercase;
  align-items: center;
  opacity: 0.75;
  font-weight: 500;
  overflow: hidden;

  ${({ sortDirection, theme }) =>
    sortDirection &&
    css`
      background-color: ${lighten(0.5, theme.colors.secondary)};
    `}

  ${({ sortable, theme }) =>
    sortable &&
    css`
      hover: {
        background-color: ${lighten(0.6, theme.colors.secondary)};
      }
    `}
`;

export const TableBodyRow = styled.div<{
  isDragging?: boolean;
  hasClickHandler?: boolean;
}>`
  position: relative;
  display: flex;
  align-content: center;
  border-bottom: 1px solid
    ${({ theme }) => transparentize(0.935, theme.colors.secondary)};
  cursor: ${({ hasClickHandler }) => (hasClickHandler ? "pointer" : "inherit")};
  background: ${({ theme, isDragging }) =>
    isDragging ? transparentize(0.935, theme.colors.primary) : "none"};

  :last-of-type {
    border-bottom: none;
  }

  :hover {
    background: ${({ theme }) => transparentize(0.965, theme.colors.secondary)};
  }
`;

export const TableBodyCell = styled.div<{
  flex?: number;
  width?: string | number;
  align?: TableCellAlign;
  noPadding?: boolean;
  noVerticalPadding?: boolean;
  minWidth?: string;
  isCursorPointer?: boolean;
}>`
  flex: ${({ flex }) => flex ?? 0};
  min-width: ${({ width }) => width ?? "auto"};
  justify-content: ${({ align }) => alignToJustify[align ?? "left"]};
  line-height: 1;
  padding: ${({ noPadding, noVerticalPadding }) => {
    if (noPadding) {
      return "0";
    }

    if (noVerticalPadding) {
      return "0 1.25rem";
    }

    return "1rem 1.25rem";
  }};
  display: flex;
  align-items: center;
  overflow: hidden;
  cursor: ${({ isCursorPointer }) => (isCursorPointer ? "pointer" : "inherit")};
`;

export const TableEmptyMessage = styled.div`
  padding: 1.25rem;
`;

export const TableHead = styled.div``;
export const TableBody = styled.div<{ isSubTable?: boolean }>`
  margin-left: ${({ isSubTable }) => (isSubTable ? "2rem" : "auto")};
`;
export const TableFooter = styled.div``;

export const TableFooterRow = styled.div``;

export const CollapseIconsWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
