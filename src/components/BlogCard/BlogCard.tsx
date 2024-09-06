import React, { MouseEventHandler } from "react";
import { BlogCardPropsType } from "../../types/BlogPostTypes";
import { blogPostedTime } from "../../utils/blogPostFunctions";
import { AiFillLike } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";

import { Link } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../zustand/authStore";
import { queryClient } from "../../main";

const BlogCard = ({
  post,
  pageIndex,
}: {
  post: BlogCardPropsType;
  pageIndex: number;
}) => {
  // console.log("page index: ", pageIndex)
  const userId = useAuthStore((state) => state.auth.id);
  const likeMutation = useMutation({
    mutationFn: async (param:string) => {
      const response = await axiosInstance.patch(`/post/${param}/${post._id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (oldData) => {
        console.log("old data: ", oldData);
        console.log("old data with page index: ", oldData.pages[pageIndex]);
        return {
          ...oldData, // Copy the entire structure
          pages: oldData.pages.map((page, index) => {
            if (index !== pageIndex) {
              return page; // If this is not the page we want to update, return it unchanged
            }

            // Update the page with the known index immutably
            return {
              ...page,
              data: page.data.map(
                (post) =>
                  post._id === data.data._id
                    ? { ...post, likes: data.data.likes } // Update the likes for the post with the matching id
                    : post // Return unchanged posts
              ),
            };
          }),
        };
      });
    },
  });

  const handleLike = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, param:string) => {
    e.stopPropagation();
    e.preventDefault();
    likeMutation.mutate(param);
  };

  return (
    <Link
      to={`/post/${post._id}`}
      className="bg-gray-200 dark:bg-gray-700/40 hover:bg-gray-300 hover:dark:bg-gray-700 py-3 block text-black dark:text-white mb-3"
    >
      <h2 className="text-xl">{pageIndex}</h2>
      <div className="flex flex-row sm:flex-col justify-between ">
        <div className="px-2 w-[70%] sm:w-[100%]">
          <div className="flex justify-start sm:justify-between sm:items-center ">
            <div className="flex items-center gap-1">
              {post.author.coverImage ? (
                <img className="w-[30px]" src={post.author.coverImage} alt="" />
              ) : (
                <div className="size-[30px] bg-white dark:bg-gray-900 flex items-center justify-center rounded-full">
                  {post.author?.userName?.slice(0, 1)}
                </div>
              )}
              <div className="flex flex-col">
                <h2>{post.author.userName}</h2>
                <span className="text-[8px]">
                  {blogPostedTime(post.createdAt)}
                </span>
              </div>
            </div>
            <div className="flex-grow-0 text-sm mt-auto sm:mt-0 sm:flex-grow text-right">
              {post.community ? "Community" : "Blog"}
            </div>
          </div>
          <p className="text-base font-semibold line-clamp-1 sm:line-clamp-none">
            {post.title}
          </p>
        </div>
        <div className="sm:w-[100%] w-[30%]">
          <img
            src={post.image}
            className="w-full my-2 min-h-[50px] sm:min-h-[100px] transition-all"
            alt=""
          />
        </div>
      </div>
      <div className="px-2">
        <div className="flex">
          <div className="flex items-center">
            <span className="ml-2">{post.likes.length}</span>
            <div onClick={(e)=> handleLike(e, post.likes.includes(userId || "") ? "unlike" : "like")}>
              {likeMutation.isPending ? (
                <div className="size-5 border border-t-transparent border-sky-400  rounded-full animate-spin"></div>
              ) : (
                <AiFillLike
                  className={`${
                    post.likes.includes(userId || "")
                      ? "fill-sky-500"
                      : "fill-gray-200"
                  }`}
                />
              )}
            </div>
            <div className="size-1 bg-white rounded-full ml-2"></div>
            <span className="ml-2">{post.comments.length}</span>
            <MdModeComment className="mt-[4px]" />
          </div>

          <div className="flex-grow text-right">{post.views} views</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
