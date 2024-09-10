import React, { useState } from "react";
import { FaShareSquare } from "react-icons/fa";
import { BlogCardPropsType } from "../../types/BlogPostTypes";
import { blogPostedTime } from "../../utils/blogPostFunctions";
import { AiFillLike } from "react-icons/ai";
import { MdModeComment } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../zustand/authStore";
import { queryClient } from "../../main";
import { FaEye } from "react-icons/fa";
import ShareModal from "./ShareModal";
import { toast } from "react-toastify";

const BlogCard = ({
  post,
  pageIndex,
  queryKey,
}: {
  post: BlogCardPropsType;
  pageIndex: number;
  queryKey: string;
}) => {
  // console.log("page index: ", pageIndex)
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.auth.id);
  const [showModal, setShowModal] = useState(false);

  const likeMutation = useMutation({
    mutationFn: async (param: string) => {
      const response = await axiosInstance.patch(`/post/${param}/${post._id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
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

  const shareMutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.patch(`/post/share/${post._id}`);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success("Post shared successfully", {
        
      });
      setShowModal(false);
      queryClient.setQueryData([queryKey], (oldData: any) => {
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
                    ? { ...post, shares: data.data.shares } // Update the likes for the post with the matching id
                    : post // Return unchanged posts
              ),
            };
          }),
        };
      });
    }
  });

  const handleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    param: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    likeMutation.mutate(param);
  };

  const handleAuthorClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/${post.author.userName}/blog`);
  };
  const handleShareBlog = () => {
    shareMutation.mutate();
  };

  return (
    <>
      <Link
        to={`/post/${post._id}`}
        className="bg-gray-200 dark:bg-gray-700/40 hover:bg-gray-300 hover:dark:bg-gray-700 py-3 block text-black dark:text-white mb-3"
      >
        <div className="flex flex-row sm:flex-col justify-between ">
          <div className="px-2 w-[70%] sm:w-[100%]">
            <div className="flex justify-start sm:justify-between sm:items-center ">
              <div className="flex items-center gap-1">
                {post.author.avatarImage ? (
                  <img
                    className="size-[30px] rounded-full "
                    src={post.author.avatarImage}
                    alt=""
                  />
                ) : (
                  <div className="size-[30px] bg-white dark:bg-gray-900 flex items-center justify-center rounded-full">
                    {post.author?.userName?.slice(0, 1)}
                  </div>
                )}
                <div className="flex flex-col">
                  <h2 className="hover:underline" onClick={handleAuthorClick}>
                    {post.author.userName}
                  </h2>
                  <span className="text-[10px]">
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
              className={`w-full my-2 min-h-[50px] sm:min-h-[100px] transition-all `}
              alt=""
            />
          </div>
        </div>
        <div className="px-2">
          <div className="flex">
            <div className="flex items-center">
              <span className="ml-2 text-xl">{post.likes.length}</span>
              <div
                onClick={(e) =>
                  handleLike(
                    e,
                    post.likes.includes(userId || "") ? "unlike" : "like"
                  )
                }
              >
                {likeMutation.isPending ? (
                  <div className="size-5 border border-t-transparent border-sky-400  rounded-full animate-spin"></div>
                ) : (
                  <AiFillLike
                    className={`text-xl hover:fill-sky-400 ${
                      post.likes.includes(userId || "")
                        ? "fill-sky-500"
                        : "fill-black dark:fill-gray-200"
                    }`}
                  />
                )}
              </div>
              <div className="size-1 bg-gray-900 dark:bg-white rounded-full ml-2 text-xl flex items-center"></div>
              <div className=" text-right text-xl justify-end items-center flex gap-1 mr-1 ml-2">
                {post.comments.length} <MdModeComment className="mt-[7px]" />
              </div>
            </div>
            <div className="flex items-center flex-grow gap-2 justify-end">
              <div className=" text-right text-xl justify-end items-center flex gap-1 mr-1">
                {post.views} <FaEye className="" />
              </div>
              <div className="size-1 bg-white rounded-full mt-[3px]"></div>
              <FaShareSquare
                onClick={(e) => {
                  if(post.author._id === userId) return;
                  if(post.shares.includes(userId as string)) return;
                  e.preventDefault();
                  setShowModal(true);
                }}
                className={` text-xl ${
                  post.author._id === userId ? "fill-gray-600" : "fill-white hover:fill-sky-400"
                } ${
                  post.shares.includes(userId as string) ? "fill-sky-400" : ""}`}
              />
            </div>
          </div>
        </div>
      </Link>
      <ShareModal
        showModal={showModal}
        setShowModal={setShowModal}
        shareBlog={handleShareBlog}
        sharing={shareMutation.isPending}
      />
    </>
  );
};

export default BlogCard;
