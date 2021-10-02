import Head from "next/head";
import { useQuery } from "react-query";
import { getTasks, GET_TASKS } from "../api";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table/Table";
import { useAuthContext } from "../utils/AuthContext";
import { withAuth } from "../utils/authHoc";

export const Tasks = withAuth(() => {
  const { user } = useAuthContext();
  const { data: tasks = [], isLoading } = useQuery(
    [GET_TASKS, user?.id],
    getTasks
  );

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
        <Navbar />

        <Table
          columns={[
            { field: "name", flex: 1 },
            { field: "status", flex: 1 },
          ]}
          data={tasks}
          loading={isLoading}
        />

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
    </>
  );
});
