import { axiosInstance } from "../axiosInstance";

type signUpPayloadType = {
  userName: string;
  email: string;
  password: string;
};
type signInPayloadType = {
  email: string;
  password: string;
};

// type signUpResponseType = {
//     token:string,
//     success:boolean,
//     message:string,
//     statusCode:number
// }

const signUp = async (payload: signUpPayloadType) => {
  const response = await axiosInstance.post("/auth/signup", payload);
  return response.data;
};
const signIn = async (payload: signInPayloadType) => {
  const response = await axiosInstance.post("/auth/signin", payload);
  return response.data;
};

const checkUserNameAvailiblity = async (userName: string) => {
  const response = await axiosInstance.get(
    `/auth/isusernameavailable/${userName}`
  );
  return response.data;
};

export const authQuery = {
  signUp,
  signIn,
  checkUserNameAvailiblity,
};
