import Link from "next/link";
import styled from "styled-components";
import { routes } from "../utils/constants";
import { Button } from "./Button";

export const Footer = () => {
  return (
    <Wrapper>
      <Link href={routes.contacts} passHref>
        <Button>contacts</Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  align-items: center;
  padding: 5rem;
`;
