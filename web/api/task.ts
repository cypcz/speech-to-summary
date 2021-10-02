import { axios } from ".";

enum TaskStatus {
  PROCESSING,
  WAITING_FOR_TRANSCRIPT,
  DONE,
}

type GetTasksResult = {
  id: string;
  name: string;
  status: TaskStatus;
  transcript: string;
  summaries: string[];
}[];
export const GET_TASKS = "/GET_TASKS";
export const getTasks = async () =>
  (await axios.get<GetTasksResult>("/tasks")).data;
