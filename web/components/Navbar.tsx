import Link from "next/link";
import styled from "styled-components";
import { useAuthContext } from "../utils/AuthContext";
import { routes } from "../utils/constants";
import { Button } from "./Button";

export const Navbar = () => {
  const { user, logout } = useAuthContext();

  return (
    <Wrapper>
      <LeftSide>
        <Link href={user ? routes.app : routes.landing} passHref>
          <Button>
            <Logo>STS</Logo>
          </Button>
        </Link>
        <Link href={routes.pricing} passHref>
          <Button>Pricing</Button>
        </Link>
      </LeftSide>
      <RightSide>
        {user ? (
          <>
            <Link href={routes.tasks} passHref>
              <Button variant="text">my tasks</Button>
            </Link>
            <Button variant="outlined" onClick={logout}>
              logout
            </Button>
          </>
        ) : (
          <Link href={routes.login} passHref>
            <Button variant="text">
              <Span>App</Span>
            </Button>
          </Link>
        )}
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 70px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  gap: 5rem;
  padding-left: 5rem;
  flex: 1;
`;

const RightSide = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  gap: 2rem;
  padding-right: 5rem;
  flex: 1;
`;

const Span = styled.span`
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
`;

const Logo = styled.span`
  font-size: 2rem;
`;
