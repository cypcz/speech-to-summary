import { lighten, transparentize } from "polished";
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Montserrat';
    src: url('/Montserrat.ttf') format('truetype');
  }

  @font-face {
    font-family: 'Montserrat-light';
    src: url('/Montserrat-light.ttf') format('truetype');
  }

  html {
    font-size: 62.5%;
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 1.5rem;
    font-family: 'Montserrat-light';
    letter-spacing: 0.3rem;
    text-transform: lowercase;
  }

  .type-writer {
    font-size: 3rem;
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
  primary: "#1D1E24",
  secondary: "#E3DDD6",
  gray: "#DCDCDC",
  error: "red",
};

export const theme = {
  colors,
  borders: {
    border: `1px solid ${lighten(0.22, colors.primary)}`,
    radius: "0.6rem",
  },
  components: {
    button: {
      variant: {
        contained: {
          backgroundColor: colors.primary,
          color: colors.secondary,
          hoverColor: transparentize(0.1, colors.primary),
          border: `1px solid ${colors.primary}`,
        },
        outlined: {
          backgroundColor: colors.secondary,
          color: colors.primary,
          hoverColor: transparentize(0.9, colors.primary),
          border: `1px solid ${colors.primary}`,
        },
        text: {
          backgroundColor: "transparent",
          color: colors.primary,
          hoverColor: transparentize(0.9, colors.primary),
          border: `1px solid transparent`,
        },
      },
    },
  },
};
