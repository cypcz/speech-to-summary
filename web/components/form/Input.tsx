import { ErrorMessage, useField } from "formik";
import { DetailedHTMLProps, InputHTMLAttributes } from "react";
import styled from "styled-components";

type Props = {
  name: string;
  label?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const Input = ({ label, ...props }: Props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <InputWrapper>
      <StyledLabel>
        {label}
        <input {...field} {...props} />
      </StyledLabel>
      <ErrorMessage name={props.name} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
