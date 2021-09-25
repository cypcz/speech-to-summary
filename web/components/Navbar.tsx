import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import styled from "styled-components";
import { GetMeResult } from "../api";
import logo from "../public/logo.svg";

interface Props {
  logoLink: string;
  user?: GetMeResult;
}

export const Navbar: FC<Props> = ({ children, user, logoLink }) => {
  return (
    <Wrapper>
      <Link href={logoLink} passHref>
        <Logo src={logo} alt="Logo" />
      </Link>
      {user && <div> hello {user.name}</div>}
      <NavItems>{children}</NavItems>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
  min-height: 70px;
`;

const Logo = styled(Image)`
  width: 70px;
  cursor: pointer;
`;

const NavItems = styled.nav`
  display: flex;
  gap: 2rem;
  list-style-type: none;
`;
