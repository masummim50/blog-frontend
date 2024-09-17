import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import useBoundStore from "../../zustand/store";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import SmallSpinner from "../../components/shared/SmallSpinner";

const SelectCommunity = ({
  community,
}: {
  community: { id: string | null; name: string | null };
}) => {
  const userId = useBoundStore((state) => state.auth.id);
  const selectedCommunity = useBoundStore((state) => state.community);
  const setCommunity = useBoundStore((state) => state.setCommunity);
  const removeCommunity = useBoundStore((state) => state.removeCommunity);
  const [showCommunityModal, setShowCommunityModal] = React.useState(false);

  //   only fetch comm data if the showmodal is set to true

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [`communityJoinedBy-${userId}`],
    queryFn: async () => {
      const response = await axiosInstance.get(`/community/user/${userId}`);
      return response.data;
    },
    enabled: showCommunityModal,
  });

  const handleCommunitySelect = (id: string, name: string) => {
    setCommunity({ id, name });
  };

  return (
    <>
      <button
        onClick={() => setShowCommunityModal(true)}
        className={`rounded-md px-3 py-[2px] border border-gray-600 ${community?.id && "text-sky-600 font-bold border-sky-600"}`}
      >
        {community?.id ? community.name : "Select Community"}
      </button>

      <AnimatePresence>
        {showCommunityModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-[100]`}
          >
            {/* show loading screen for loading the community data */}
            {isLoading && (
              <h2 className="h-full flex items-center justify-center">
                <span>Loading Communities...</span> <SmallSpinner />
              </h2>
            )}

            {/* render below part if the comm data is loaded */}
            {isSuccess && data && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-[120] text-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-10 rounded-md mw"
              >
                <>
                  <h2 className="text-xl font-bold mb-9">
                    Select Community from your account
                  </h2>

                  {data?.data.length === 0 && (
                    <h2 className="text-xl font-bold mb-9">
                      You haven't joined Any Community yet
                    </h2>
                  )}

                  {data?.data.map((community: any) => (
                    <div
                      onClick={() =>
                        handleCommunitySelect(community?._id, community?.name)
                      }
                      className={`bg-gray-200 text-black w-full rounded-md border ${
                        selectedCommunity.id === community?._id
                          ? "border-green-600"
                          : "border-gray-400"
                      } p-2 mb-2 hover:bg-gray-300 cursor-pointer text-center font-bold`}
                      key={community?._id}
                    >
                      {community?.name}
                    </div>
                  ))}

                  <div className="flex justify-end gap-3">
                    <button
                      className={`px-6 hover:bg-red-600 hover:shadow-md hover:shadow-gray-700  shadow-sm bg-red-500 text-white shadow-gray-600 py-2 border-gray-300 rounded-md`}
                      onClick={(e) => {
                        e.preventDefault();
                        removeCommunity();
                        setShowCommunityModal(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className={`px-6 hover:bg-green-600 hover:shadow-md hover:shadow-gray-700  shadow-sm bg-green-500 text-white shadow-gray-600 py-2 border-gray-300 rounded-md`}
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCommunityModal(false);
                      }}
                    >
                      Confirm
                    </button>
                  </div>
                </>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SelectCommunity;
