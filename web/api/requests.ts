import Axios from "axios";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

type MeResult = { id: string; email: string; name: string }[];
export const GET_ME = "/GET_ME";
export const getMe = async () => (await axios.get<MeResult>("/auth/me")).data;

type GetTasksResult = { id: string; transcript: string; summaries: string[] }[];
export const GET_TASKS = "/GET_TASKS";
export const getTasks = async () =>
  (await axios.get<GetTasksResult>("/tasks")).data;

type GetSignedUrlParams = { fileName: string; contentType: string };
type GetSignedUrlResult = string;
export const getSignedUrl = async (params: GetSignedUrlParams) =>
  (await axios.get<GetSignedUrlResult>("/signed-url", { params })).data;

type LoginParams = { email: string; password: string };
export const login = async ({ email, password }: LoginParams) =>
  (await axios.post("/auth/login", { email, password })).data;

export const logout = async () => (await axios.post("/auth/logout")).data;
