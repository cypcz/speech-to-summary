import Axios from "axios";
export * from "./auth";
export * from "./task";

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});
