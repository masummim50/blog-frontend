/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { axiosInstance } from "../axios/axiosInstance";

interface FetchPostsParams {
  page?: number;
  order?: string;
  tags?: string[];
  [key: string]: any; // To allow for additional query parameters
}

const useInfiniteFetchPosts = (endpoint: string, params: FetchPostsParams, queryKey:string) => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    // console.log("fetch post running? ");
    const response = await axiosInstance.get(endpoint, {
      params: { page: pageParam, ...params },
    });
    // console.log("response data from use infinite fetch post hook: ", response);
    return response.data;
  };

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: fetchPosts,
    retry:false,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta.page < lastPage.meta.totalPage
        ? lastPage.meta.page + 1
        : undefined;
    },
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (
      inView &&
      data?.pages.at(-1).meta.page < data?.pages.at(-1).meta.totalPage
    ) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, data]);

  return {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
    fetchNextPage,
    isFetchingNextPage,
    ref, // expose the ref to be used in the component
  };
};

export default useInfiniteFetchPosts;
