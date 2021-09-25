import { Dispatch, SetStateAction } from "react";
import { axios } from ".";

type GetTaskResult = { id: string; transcript: string; summaries: string[] };
export const summarizeFromYoutube = async (link: string) =>
  (await axios.post<GetTaskResult>("/summary/youtube", { link })).data;

type SummarizeFromFileParams = {
  files: File[];
  setLoadingProgress: Dispatch<SetStateAction<number | null>>;
};
export const summarizeFromFile = ({
  files,
  setLoadingProgress,
}: SummarizeFromFileParams) => {
  const file = files[0];

  const formData = new FormData();
  formData.append("file", file);

  const xhr = new XMLHttpRequest();

  xhr.upload.addEventListener("progress", (ev) => {
    setLoadingProgress(ev.loaded / ev.total);
  });

  xhr.open("POST", `${axios.defaults.baseURL}/summary/upload`);
  xhr.send(formData);
};
