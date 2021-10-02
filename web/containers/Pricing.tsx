import Head from "next/head";
import styled from "styled-components";
import { Navbar } from "../components/Navbar";

export const Pricing = () => {
  return (
    <>
      <Head>
        <title>Speech to summary | Pricing</title>
        <meta
          name="description"
          content="Easily generate AI powered summary from any speech."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <TileWrapper>
        <Tile>pricing1</Tile>
        <Tile>pricing2</Tile>
        <Tile>pricing3</Tile>
      </TileWrapper>
      <footer>footer</footer>
    </>
  );
};

const TileWrapper = styled.main`
  display: flex;
  margin-top: 5rem;
  padding: 0 5rem;
  justify-content: space-evenly;
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  border: ${({ theme }) => theme.borders.border};
  border-radius: ${({ theme }) => theme.borders.radius};
`;
