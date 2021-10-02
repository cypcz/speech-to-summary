import { theme } from "../utils/theme";

type ThemeInterface = Readonly<typeof theme>;

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}

interface CustomColumn {
  align?: "left" | "center" | "right" | "justify" | "char";
}

declare module "react-table" {
  export interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends CustomColumn {}

  export interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>
  > extends CustomColumn {}
}
