import { useEffect } from "react";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";

// interface Post {
//   id: string;
//   title: string;
//   content: string;
//   tags: string[];
//   image: string;
// }
// const breakpointColumnsObj = {
//   default: 4,
//   1100: 3,
//   700: 2,
//   500: 1,
// };

// const fetchPosts = async ({ pageParam }: { pageParam: number }) => {
//   console.log("fetch post props: ", pageParam);
//   const response = await axiosInstance.get(
//     `/post?page=${pageParam ? pageParam : 1}`
//   );
//   console.log(response.data);
//   return response.data;
// };
const HomePage = () => {
  // const {
  //   data,
  //   isLoading,
  //   isSuccess,
  //   isError,
  //   error,
  //   fetchNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  //   initialPageParam: 1,
  //   getNextPageParam: (data) => {
  //     return data.meta.page + 1;
  //   },
  // });

  // const { ref, inView } = useInView();

  // useEffect(() => {
  //   // console.log("data: ", data?.pages.at(-1))
  //   if (
  //     inView &&
  //     data?.pages.at(-1).meta.page < data?.pages.at(-1).meta.totalPage
  //   ) {
  //     fetchNextPage();
  //   }
  // }, [inView, fetchNextPage, data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100vh] mw pt-7 px-2">
      <BlogPostsContainer apiEndPoint="/post" queryKey="posts" />
    </div>
  );
};

export default HomePage;
