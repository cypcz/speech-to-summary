import { lighten, transparentize } from "polished";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1.5rem;
  }

  .type-writer {
    font-size: 30px;
  }
`;

const SIZE = {
  xs: "544px",
  sm: "768px",
  md: "992px",
  lg: "1200px",
};

export const QUERY = {
  belowXs: `(max-width: ${SIZE.xs})`,
  aboveXs: `(min-width: ${SIZE.xs})`,
  belowSm: `(max-width: ${SIZE.sm})`,
  aboveSm: `(min-width: ${SIZE.sm})`,
  belowMd: `(max-width: ${SIZE.md})`,
  aboveMd: `(min-width: ${SIZE.md})`,
  belowLg: `(max-width: ${SIZE.lg})`,
  aboveLg: `(min-width: ${SIZE.lg})`,
  landscape: `(orientation: landscape)`,
  portrait: `(orientation: portrait)`,
};

const colors = {
  primary: "#b460ff",
  secondary: "#ffffff",
  gray: "#DCDCDC",
  error: "red",
};

export const theme = {
  colors,
  components: {
    button: {
      variant: {
        contained: {
          backgroundColor: colors.primary,
          color: colors.secondary,
          hoverColor: transparentize(0.1, colors.primary),
          borderColor: colors.primary,
        },
        outlined: {
          backgroundColor: colors.secondary,
          color: colors.primary,
          hoverColor: lighten(0.3, colors.primary),
          borderColor: colors.primary,
        },
        text: {
          backgroundColor: "transparent",
          color: colors.primary,
          hoverColor: transparentize(0.9, colors.primary),
          borderColor: "transparent",
        },
      },
    },
  },
};
