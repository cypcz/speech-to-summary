import Head from "next/head";
import Link from "next/link";
import { useQuery } from "react-query";
import { getTasks, GET_TASKS } from "../api";
import { Button } from "../components/Button";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../utils/AuthContext";
import { withAuth } from "../utils/authHoc";
import { routes } from "../utils/constants";

export const Tasks = withAuth(() => {
  const { user, logout } = useAuthContext();
  const { data: tasks } = useQuery([GET_TASKS, user?.id], getTasks);

  return (
    <>
      <Head>
        <title>Speech to summary | Tasks</title>
        <meta
          name="description"
          content="Easily generate AI powered summary from any speech."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar logoLink={routes.app}>
          <Link href={routes.tasks} passHref>
            <Button variant="text">my tasks</Button>
          </Link>
          <Button onClick={logout} variant="outlined">
            logout
          </Button>
        </Navbar>

        {tasks?.map((task) => (
          <div
            key={task.id}
            style={{ marginBottom: "1rem", borderBottom: "2px solid black" }}
          >
            <p>Transcript: {task.transcript}</p>
            {task.summaries.map((s, i) => (
              <p key={i}>{`Summary ${i}: ${s}`}</p>
            ))}
          </div>
        ))}
      </main>

      <footer>footer</footer>
    </>
  );
});
