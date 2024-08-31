import axios from "axios";

const baseUrl = "http://localhost:5000/api/v1";

const token = localStorage.getItem("blog-token");

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("blog-token");

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export type axiosResponseType<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta?: metaType;
  data?: T | null;
  token?: string | null;
};
type metaType = {
  page: number;
  size: number;
  total: number;
  totalPage?: number;
};
