import { ErrorMessage, useField } from "formik";
import { lighten } from "polished";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type Props = {
  name: string;
  label?: string;
  fullWidth?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ label, fullWidth, ...props }: Props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <InputWrapper>
      <StyledLabel>
        {label}
        {/* @ts-ignore */}
        <StyledInput fullWidth={fullWidth} {...field} {...props} />
      </StyledLabel>
      <ErrorMessage name={props.name} component={Error} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input<{ fullWidth?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  border-radius: 4px;
  min-height: 20px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};

  :focus {
    outline: none;
    box-shadow: 0px 0px 2px 1px
      ${({ theme }) => lighten(0.1, theme.colors.primary)};
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
`;

const Error = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.error};
`;
