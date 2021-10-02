import styled, { css } from "styled-components";

interface Props {
  variant?: "outlined" | "contained" | "text";
  width?: string;
  fullWidth?: boolean;
}

export const Button = styled.button<Props>`
  ${({ theme, variant = "contained", fullWidth, width }) => css`
    background-color: ${theme.components.button.variant[variant]
      .backgroundColor};
    color: ${theme.components.button.variant[variant].color};
    border: ${theme.components.button.variant[variant].border};
    padding: 0.5rem 1rem;
    min-width: 5rem;
    border-radius: ${theme.borders.radius};
    cursor: pointer;
    width: ${width || (fullWidth ? "100%" : "auto")};
    font-size: inherit;
    font-family: inherit;
    letter-spacing: inherit;
    text-transform: inherit;

    :hover {
      background-color: ${theme.components.button.variant[variant].hoverColor};
    }
  `}
`;
