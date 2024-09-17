import useInfiniteFetchPosts from "../../hooks/useInfinitePosts";
import Masonry from "react-masonry-css";
import { BlogCardPropsType } from "../../types/BlogPostTypes";
import BlogCard from "../../components/BlogCard/BlogCard";
import { motion } from "framer-motion";

const breakpointColumnsObj = {
  default: 4,
  1024: 3,
  768: 2,
  640: 1,
};

const BlogPostsContainer = ({
  apiEndPoint,
  queryKey,
}: {
  apiEndPoint: string;
  queryKey: string;
}) => {
  const { data, isLoading, isError, error, isFetchingNextPage, ref } =
    useInfiniteFetchPosts(apiEndPoint, {}, queryKey);

  if (isError && error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="px-2">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          Loading...{" "}
          <span className="size-8 rounded-full border-4 border-t-transparent border-white animate-spin"></span>
        </div>
      )}

      {data?.pages[0].data.length === 0 && (
        <div className="text-black p-5 dark:text-white text-center">
          No Data Found{" "}
        </div>
      )}
      <div className="">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {data?.pages.map((page, pageIndex) =>
            page.data.map((d: BlogCardPropsType) => (
              <motion.div
                initial={{ opacity: 0, scale: 0.4 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                key={d._id}
              >
                <BlogCard
                  key={d._id}
                  post={d}
                  pageIndex={pageIndex}
                  queryKey={queryKey}
                />
              </motion.div>
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
        !isLoading && (
          <div className="min-h-[100px] text-center py-4 mb-10text-white">
            No More Data
          </div>
        )}
    </div>
  );
};

export default BlogPostsContainer;
