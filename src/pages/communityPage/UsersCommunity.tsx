import React from "react";
import useAuthStore from "../../zustand/authStore";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import CommunityCard from "./CommunityCard";

const UsersCommunity = () => {
  const userId = useAuthStore((state) => state.auth.id);
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [`communityCreatedBy-${userId}`],
    queryFn: async () => {
      const response = await axiosInstance.get("/community/createdbyuser");
      return response.data;
    },
  });
  const {
    data: joined,
    isLoading: joinedLoading,
    isSuccess: joinedSuccess,
  } = useQuery({
    queryKey: [`communityJoinedBy-${userId}`],
    queryFn: async () => {
      const response = await axiosInstance.get(`/community/${userId}`);
      return response.data;
    },
    enabled: isSuccess,
  });
  const {
    data: all,
    isLoading: allLoading,
    isSuccess: allSuccess,
  } = useQuery({
    queryKey: [`community`],
    queryFn: async () => {
      const response = await axiosInstance.get("/community");
      return response.data;
    },
    enabled: joinedSuccess,
  });

  return (
    <>
      {userId && (
        <div className="mt-3">
          {isLoading && (
            <div className="flex items-center justify-center w-full h-[100px]">
              Loading...{" "}
              <span className="inline-block size-5 border border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin "></span>
            </div>
          )}
          {isSuccess && data?.data.length > 0 && (
            <div className="font-bold text-2xl mb-2">Created By You</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {data?.data.map((community: any) => (
              <CommunityCard community={community} />
            ))}
          </div>
        </div>
      )}
      {/* \fetch community userJoined if user exists */}
      {userId && (
        <div className="mt-3">
          {joinedLoading && (
            <div className="flex items-center justify-center w-full h-[100px]">
              Loading subscribed...{" "}
              <span className="inline-block size-5 border border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin "></span>
            </div>
          )}
          
          {joinedSuccess && joined?.data.length > 0 && (
            <div className="font-bold text-2xl mb-2">You Subscribed</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {joined?.data.map((community: any) => (
              <CommunityCard community={community} />
            ))}

          </div>
            {joinedSuccess && joined?.data.length == 0 && (
              <div className="font-bold text-2xl mb-2 text-center w-full border rounded-md py-5 border-gray-400">
                You Haven't subscribed to any Community
              </div>
            )}
        </div>
      )}

      {/* fetch all communities after the joined communities have successed, if userid doesn't exists, this will fetch immeditatly so check if userid does not exists or joined community fetch success, if one of them is true fetch all communities  */}

      {(!userId || joinedSuccess) && (
        <div className="mt-3">
          {allLoading && (
            <div className="flex items-center justify-center w-full h-[100px]">
              Loading all...{" "}
              <span className="inline-block size-5 border border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin "></span>
            </div>
          )}
          {allSuccess && all?.data.length > 0 && (
            <div className="font-bold text-2xl mb-2">All Communities</div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {all?.data.map((community: any) => (
              <CommunityCard community={community} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UsersCommunity;
