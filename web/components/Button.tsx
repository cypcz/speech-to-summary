import styled, { css } from "styled-components";

interface Props {
  variant?: "outlined" | "contained" | "text";
  fullWidth?: boolean;
}

export const Button = styled.button<Props>`
  ${({ theme, variant = "contained", fullWidth }) => css`
    background-color: ${theme.components.button.variant[variant]
      .backgroundColor};
    color: ${theme.components.button.variant[variant].color};
    border: 1px solid ${theme.components.button.variant[variant].borderColor};
    padding: 0.5rem 1rem;
    min-width: 50px;
    border-radius: 6px;
    cursor: pointer;
    width: ${fullWidth ? "100%" : "auto"};

    :hover {
      background-color: ${theme.components.button.variant[variant].hoverColor};
    }
  `}
`;
