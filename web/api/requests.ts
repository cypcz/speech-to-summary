import Axios from "axios";

export const axios = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

type GetDataResult = { hello: string };
export const GET_DATA = "/GET_DATA";
export const getData = async () => (await axios.get<GetDataResult>("/")).data;

type GetSignedUrlParams = { fileName: string; contentType: string };
type GetSignedUrlResult = string;
export const getSignedUrl = async (params: GetSignedUrlParams) =>
  (await axios.get<GetSignedUrlResult>("/signed-url", { params })).data;
