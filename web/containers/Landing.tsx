import Head from "next/head";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import { Footer } from "../components/Footer";
import { Soundwave } from "../components/icons/Soundwave";
import { Navbar } from "../components/Navbar";
import { QUERY } from "../utils/theme";

export const Landing = () => {
  return (
    <>
      <Head>
        <title>Speech to summary | Welcome</title>
        <meta
          name="description"
          content="Easily generate AI powered summary from any speech."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <Main>
        <LeftSide>
          <Texts>
            <Soundwave />
            <MainTitle>Speech to summary</MainTitle>
            <SecondaryTitle>
              STS is an AI powered assistant that takes in audio input and
              outputs a summary of key points you&apos;re more likely to
              remember.
            </SecondaryTitle>
            <SecondaryTitle>
              Save your time by avoiding watching lengthy content, and let StS
              do the legwork for you.
            </SecondaryTitle>
          </Texts>
        </LeftSide>

        <RightSide>
          <VideoEmbed
            id="ytplayer"
            src="https://youtube.com/embed/oXEYhurdOhY?autoplay=1"
            frameBorder="0"
          />
          <Typewriter
            options={{
              strings: ["Hello world"],
              autoStart: true,
              loop: true,
              wrapperClassName: "type-writer",
              cursorClassName: "type-writer",
            }}
          />
        </RightSide>
      </Main>

      <Footer />
    </>
  );
};

const Main = styled.main`
  display: flex;
  height: calc(100vh - 70px);
`;

const LeftSide = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10rem 5rem 0 5rem;
  gap: 3rem;
`;

const Texts = styled.div`
  padding-left: 5rem;
`;

const RightSide = styled.div`
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10rem 5rem 0 5rem;
  gap: 3rem;
`;

const VideoEmbed = styled.iframe`
  width: 640px;
  height: 360px;
  margin-bottom: 5rem;

  @media ${QUERY.belowLg} {
    width: 320px;
    height: 180px;
  }
`;

const MainTitle = styled.h1`
  font-size: 4rem;
  margin-top: 10rem;
`;

const SecondaryTitle = styled.h3`
  font-size: 2rem;
`;
