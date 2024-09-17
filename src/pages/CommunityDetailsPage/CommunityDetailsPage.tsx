import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import CommunityBanner from "./CommunityBanner";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";
import SmallSpinner from "../../components/shared/SmallSpinner";

const CommunityDetailsPage = () => {
  const { id } = useParams();

  // first request to get the community details and render the banner
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [`community-${id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(`/community/${id}`);
      return response.data;
    },
  });

  // once community details is fetched send a second request for the posts made in this community, use blogpostscontainer to hold them

  return (
    <div className="l d pt-5 pb-16 min-h-[100vh]">
      {isLoading && (
        <h2 className="flex mw justify-center items-center text-2xl h-[100px]">
          Loading community details... <SmallSpinner />
        </h2>
      )}

      {isSuccess && (
        <div>
          {/* render the banner here */}
          <div>
            <CommunityBanner community={data.data} />
          </div>
        </div>
      )}
      {isSuccess && (
        <div className="mw">
          {/* render post data here */}
          <BlogPostsContainer
            apiEndPoint={`post/community/${id}`}
            queryKey={`post-community-${id}`}
          />
        </div>
      )}
    </div>
  );
};

export default CommunityDetailsPage;
