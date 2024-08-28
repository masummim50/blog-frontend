import { axiosInstance } from "../axiosInstance";

const getUserCommunities = async (userId: string) => {
  const response = await axiosInstance.get(`/community/${userId}`);
  return response.data;
};

export const CommunityQuery = {
  getUserCommunities,
};
