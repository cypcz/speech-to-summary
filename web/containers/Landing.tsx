import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import Typewriter from "typewriter-effect";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { routes } from "../utils/constants";
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

      <Background>
        <Navbar logoLink={routes.landing}>
          <Link href={routes.pricing} passHref>
            <Button variant="text">Pricing</Button>
          </Link>
          <Link href={routes.login} passHref>
            <Button>App</Button>
          </Link>
        </Navbar>

        <Section>
          <Side>
            <MainTitle>Quick and sharp summary of your content!</MainTitle>
            <SecondaryTitle>
              StS is an AI powered assistant that takes in audio input and
              outputs a summary of key points you&apos;re more likely to
              remember. Save your time by avoiding watching lengthy content, and
              let StS do the legwork for you!
            </SecondaryTitle>
          </Side>
          <Side>
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
          </Side>
        </Section>
      </Background>

      <footer>footer</footer>
    </>
  );
};

const Background = styled.div`
  background: rgb(180, 96, 255);
  background: linear-gradient(
    135deg,
    rgba(180, 96, 255, 0.1) 0%,
    rgba(180, 96, 255, 0.5) 100%
  );
`;

const Section = styled.section`
  display: flex;
  height: calc(100vh - 70px);
  padding: 0 5rem;
  gap: 3rem;

  @media ${QUERY.belowSm} {
    flex-direction: column;
    gap: 0;
  }
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 100px;
  align-items: center;
  flex: 1;

  @media ${QUERY.belowSm} {
    flex-direction: column;
    flex: 0;
  }
`;

const VideoEmbed = styled.iframe`
  width: 640px;
  height: 360px;
  margin-bottom: 50px;

  @media ${QUERY.belowLg} {
    width: 320px;
    height: 180px;
  }
`;

const MainTitle = styled.h1`
  font-size: 40px;
`;

const SecondaryTitle = styled.h3`
  font-size: 20px;
`;
