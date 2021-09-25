import { theme } from "../utils/theme";

type ThemeInterface = Readonly<typeof theme>;

declare module "styled-components" {
  interface DefaultTheme extends ThemeInterface {}
}
