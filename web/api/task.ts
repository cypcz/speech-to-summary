import { axios } from ".";

type GetTasksResult = { id: string; transcript: string; summaries: string[] }[];
export const GET_TASKS = "/GET_TASKS";
export const getTasks = async () =>
  (await axios.get<GetTasksResult>("/tasks")).data;
