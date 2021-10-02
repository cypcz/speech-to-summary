import Head from "next/head";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import styled from "styled-components";
import { summarizeFromFile, summarizeFromYoutube } from "../api/summary";
import { Button } from "../components/Button";
import { StyledInput } from "../components/form/Input";
import { Navbar } from "../components/Navbar";
import { useAuthContext } from "../utils/AuthContext";
import { withAuth } from "../utils/authHoc";

enum TaskType {
  UPLOAD,
  YOUTUBE,
}

export const App = withAuth(() => {
  const { user, logout } = useAuthContext();
  const [loadingProgress, setLoadingProgress] = useState<number | null>(null);
  const [taskType, setTaskType] = useState(TaskType.YOUTUBE);
  const [youtubeLink, setYoutubeLink] = useState("");

  const { mutate: handleYoutubeTask } = useMutation(summarizeFromYoutube);

  const onDrop = useCallback(
    (acceptedFiles: File[]) =>
      summarizeFromFile({ files: acceptedFiles, setLoadingProgress }),
    []
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ["audio/*", "video/*"],
    maxFiles: 1,
    multiple: false,
  });

  return (
    <>
      <Head>
        <title>Speech to summary | App</title>
        <meta
          name="description"
          content="Easily generate AI powered summary from any speech."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Navbar />
        <InputGroup>
          <Buttons>
            <Button
              variant={taskType === TaskType.YOUTUBE ? "contained" : "text"}
              onClick={() => setTaskType(TaskType.YOUTUBE)}
              width="16rem"
            >
              youtube link
            </Button>
            <Button
              variant={taskType === TaskType.UPLOAD ? "contained" : "text"}
              onClick={() => setTaskType(TaskType.UPLOAD)}
              width="16rem"
            >
              upload file
            </Button>
          </Buttons>

          {taskType === TaskType.YOUTUBE && (
            <InputWrapper>
              <StyledInput
                placeholder="https://youtube.com/..."
                fullWidth
                onChange={(e) => setYoutubeLink(e.target.value)}
              />
              <Button onClick={() => handleYoutubeTask(youtubeLink)}>
                start
              </Button>
            </InputWrapper>
          )}

          {taskType === TaskType.UPLOAD && (
            <UploadWrapper>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag drop some files here, or click to select files</p>
              </div>
            </UploadWrapper>
          )}
        </InputGroup>

        {loadingProgress && (
          <div>Progress: {(loadingProgress * 100).toFixed(0)}%</div>
        )}
      </main>
    </>
  );
});

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5rem;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  min-width: 30rem;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.gray};
  padding: 0 2rem;
  margin-top: 2rem;
  border-radius: 6px;
  cursor: pointer;
  font-style: italic;
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;
