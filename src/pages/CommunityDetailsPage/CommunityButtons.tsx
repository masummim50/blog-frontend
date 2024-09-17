
import useBoundStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import { queryClient } from "../../main";

const CommunityButtons = ({
  community,
}: {
  community: { _id: string; name: string; members: string[] };
}) => {
  const userId = useBoundStore((state) => state.auth.id);
  const navigate = useNavigate();
  const setCommunity = useBoundStore((state) => state.setCommunity);

  const subscribeMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.patch(
        `/community/${
          community.members.includes(userId as unknown as string)
            ? "unsubscribe"
            : "subscribe"
        }/${community._id}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Subscription Updated successfully", {});
      queryClient.setQueryData([`community-${community._id}`], (oldData:any)=> {
        const newMembers = data.data.members;
        return {...oldData, data: {...oldData.data, members: newMembers}}
      })
    },
    onError: () => {
      toast.error("Something went wrong", {});
    },
  });

  const handleSelectCommunity = () => {
    setCommunity({ id: community._id, name: community.name });
    navigate("/me/write");
  };

  const handleSubscribe = () => {
    if (!userId) {
      toast.error("Please login to subscribe", {});
      return;
    }
    subscribeMutation.mutate();
  };

  return (
    <div className="my-2 flex">
      <button
        disabled={subscribeMutation.isPending}
        onClick={handleSubscribe}
        className={`px-5 py-2 text-sm  border rounded-tl-md rounded-bl-md disabled:cursor-not-allowed ${
          community.members.includes(userId as unknown as string) &&
          "bg-sky-400 border-sky-400 hover:bg-sky-500"
        }`}
      >
        {subscribeMutation.isPending ? (
          <span className="flex items-center justify-center">
            Updating...{" "}
            <span className="inline-block size-4 border-[3px] border-black dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></span>
          </span>
        ) : community.members.includes(userId as unknown as string) ? (
          "Un-Subscribe"
        ) : (
          "Subscribe"
        )}
      </button>
      <div className=" bg-white h-[100%] px-[1px] py-2">.</div>
      <button
        onClick={handleSelectCommunity}
        className="px-5 py-2 text-sm border border-transparent bg-sky-400 rounded-tr-md rounded-br-md"
      >
        write a post
      </button>
    </div>
  );
};

export default CommunityButtons;
