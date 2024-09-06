import useInfiniteFetchPosts from "../../hooks/useInfinitePosts";
import Masonry from "react-masonry-css";
import { BlogCardPropsType } from "../../types/BlogPostTypes";
import BlogCard from "../../components/BlogCard/BlogCard";

const breakpointColumnsObj = {
default: 4,
  1024: 3,
  768: 2,
  640: 1,
};

const BlogPostsContainer = ({ apiEndPoint , queryKey}: { apiEndPoint: string , queryKey:string}) => {
  const { data, isLoading, isError, error, isFetchingNextPage, ref } =
    useInfiniteFetchPosts(apiEndPoint, {}, queryKey);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {isLoading && <div>Loading...</div>}

      <div className="">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data?.pages.map((page, pageIndex) =>
            page.data.map((d: BlogCardPropsType) => (
              <BlogCard key={d._id} post={d} pageIndex={pageIndex}/>
            ))
          )}
        </Masonry>
      </div>

      <div className="w-full h-[1px]" ref={ref}></div>

      {isFetchingNextPage && (
        <div className="min-h-[200px] flex justify-center items-center text-white">
          Loading...{" "}
          <span className="size-[20px] border-2 border-t-transparent border-white rounded-full animate-spin"></span>
        </div>
      )}
      {data?.pages.at(-1).meta.page === data?.pages.at(-1).meta.totalPage &&
        !isLoading && <div className="min-h-[100px] text-center py-4 mb-10text-white">
        No More Data
      </div>}
    </div>
  );
};

export default BlogPostsContainer;
