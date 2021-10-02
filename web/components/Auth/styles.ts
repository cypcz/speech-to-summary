import styled from "styled-components";

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;

  > form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 50rem;
    min-height: 40rem;
    border: ${({ theme }) => theme.borders.border};
    border-radius: ${({ theme }) => theme.borders.radius};
  }
`;

export const GoogleButton = styled.button`
  border: none;
  background-color: #d34836;
  border-radius: 4px;
  width: 20rem;
  min-height: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  letter-spacing: inherit;
`;

export const FacebookButton = styled.button`
  border: none;
  background-color: #4267b2;
  border-radius: 0.4rem;
  width: 20rem;
  min-height: 3rem;
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 1rem;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  letter-spacing: inherit;
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  margin: 1rem 0 2rem 0;
  gap: 1rem;
`;

export const FormFields = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
