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

  return (
    <BlogPostsContainer apiEndPoint="/post" queryKey="posts" />

    // <div>
    //   {/* {JSON.stringify(data?.data)} */}

    //   {isLoading && <div>Loading...</div>}

    //   <div className="">
    //     <Masonry
    //       breakpointCols={breakpointColumnsObj}
    //       className="my-masonry-grid"
    //       columnClassName="my-masonry-grid_column"
    //     >
    //       {data?.pages.map((page) =>
    //         page.data.map((d: BlogCardPropsType) => (
    //           <BlogCard key={d._id} post={d} />
    //         ))
    //       )}
    //     </Masonry>
    //   </div>
    //   <div className="w-full h-[1px]" ref={ref}></div>
    //   {isFetchingNextPage && <div>Loading...</div>}
    //   {data?.pages.at(-1).meta.page === data?.pages.at(-1).meta.totalPage &&
    //     !isLoading && <div>No more data</div>}
    // </div>
  );
};

export default HomePage;
