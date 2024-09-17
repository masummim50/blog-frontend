import useBoundStore from "../../zustand/store";
import { useQuery } from "@tanstack/react-query";
import { CommunityQuery } from "../../axios/community/communityQuery";

const CommunitiesDropdown = ({ showCommunity }: { showCommunity: boolean }) => {
  const userId = useBoundStore((state) => state.auth.id);

  const { data, isFetching, isSuccess } = useQuery({
    queryFn: () => CommunityQuery.getUserCommunities(userId || ""),
    queryKey: ["user-communities"],
  });

  return (
    <div
      className={`absolute left-0 top-100 mt-3 ${
        showCommunity ? "block" : "hidden"
      } h-[50vh] l d w-[200px]`}
    >
      {/* show loading state here */}
      {isFetching && (
        <div className="h-full flex flex-col items-center justify-center">
          Loading...{" "}
          <span className="animate-spin size-[20px] border-2 border-t-transparent border-white rounded-full"></span>
        </div>
      )}

      {!isFetching && isSuccess && data?.data?.length > 0
        ? data.data.map((community: any) => (
            <div key={community.id}>{community.name}</div>
          ))
        : !isFetching && isSuccess && <div>No communities found</div>}
    </div>
  );
};

export default CommunitiesDropdown;
