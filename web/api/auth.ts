import { axios } from ".";

export type GetMeResult = { id: string; email: string; name: string };
export const GET_ME = "/GET_ME";
export const getMe = async () =>
  (await axios.get<GetMeResult>("/auth/me")).data;

export type RegisterParams = { name: string; email: string; password: string };
export const register = async (body: RegisterParams) =>
  (await axios.post("/auth/register", body)).data;

export type LoginParams = { email: string; password: string };
export const login = async (body: LoginParams) =>
  (await axios.post("/auth/login", body)).data;

export const logout = async () => (await axios.post("/auth/logout")).data;
