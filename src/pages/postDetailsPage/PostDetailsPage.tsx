import parse from "html-react-parser";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { axiosInstance } from "../../axios/axiosInstance";
import { blogPostedTime, calculateReadingTime } from "../../utils/blogPostFunctions";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import PostDetails from "./PostDetails";
import StickyFooter from "./PostDetails";
import VisibilityComponent from "./PostDetails";

interface Author {
  _id: string;
  userName: string;
  email: string;
  coverImage: string;
}

export interface Comment {
  content: string;
  author: Author;
  replies: {
    content: string;
    author: Author;
  }[];
  createdAt: string;
}

interface Like {
  _id: string;
  userName: string;
  coverImage: string;
}
interface Community {
  _id: string;
  name: string;
}

export interface Post {
  _id: string;
  title: string;
  image: string;
  content: string;
  author: Author;
  comments: Comment[]; // Assuming comments are strings, you can change this if the structure is different.
  replies: string[]; // Same assumption as comments.
  likes: Like[];
  shares: string[]; // Assuming shares are strings or user IDs.
  tags: string[];
  community: Community | null; // Community could be null or string based on the given data.
  views: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const fetchPostDetails = async (id: string) => {
  const response = await axiosInstance.get(`/post/${id}`);
  return response.data;
};

const PostDetailsPage = () => {
  // console.log("rendering post deails page");
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [`post${id}`],
    queryFn: () => fetchPostDetails(id as string),
  });

  const post: Post = data?.data;

  if (isError) {
    return (
      <div className="min-h-[200px] text-white flex justify-center items-center">
        Error loading post details: {error?.message}
      </div>
    );
  }

  return (
    <div className="min-h-[100vh] l d mw">
      {isLoading && (
        <div className="flex justify-center items-center min-h-[200px]">
          Loading...{" "}
          <span className="size-8 rounded-full border-4 border-t-transparent dark:border-t-transparent border-black dark:border-white animate-spin"></span>
        </div>
      )}

      {/* render the rest of the data */}
      {isSuccess && (
        <div className="m-auto max-w-[700px]">
          <div className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white p-4 sm:p-6 md:p-10">
            <h2 className="text-2xl font-bold ">{post?.title}</h2>
            <div className="flex items-center text-xs font-extralight text-white gap-1 mb-5">
              <span className="text-sky-400 ">
                {post?.comments.length} Comments
              </span>{" "}
              |{" "}
              <span className="text-sky-400 ">
                {post?.shares.length} Shares{" "}
              </span>{" "}
              | <span className="text-sky-400 ">{post?.views} Views</span>
            </div>

            {/* information section */}
            <div className="flex justify-between items-start">
              <div className="authorInfo flex items-center gap-2">
                <div className="size-14 rounded-full bg-black flex items-center justify-center">
                  {post?.author.coverImage ? (
                    <img src={post?.author.coverImage} alt="" />
                  ) : (
                    <span>{post?.author.userName.slice(0, 1)}</span>
                  )}
                </div>
                <div className="flex flex-col gap-0 justify-items-center">
                  <div className="flex items-center gap-2">
                    <span>{post?.author.userName}</span>{" "}
                    <span className="size-1 bg-white rounded-full inline-block"></span>
                    <span className="text-xs text-gray-400">
                      {blogPostedTime(post?.createdAt)}
                    </span>
                  </div>
                  <span className="text-sky-400 text-sm">
                    {post.community ? post.community.name : "Personal blog"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-1 h-auto">
                <div className="bg-gray-500 dark:bg-gray-800 border-r-4 border-r-sky-500 text-white text-xs px-3 py-1">
                  {calculateReadingTime(post?.content.toString())}
                </div>
                <div className="bg-gray-500 dark:bg-gray-800 border-r-4 border-r-sky-500 text-white text-xs px-3 py-1">
                  {post?.content.toString().split(" ").length} Words
                </div>
              </div>
            </div>
            <img src={post?.image} className="w-full my-3" alt="" />
            <div className="mb-4">{post?.content && parse(post?.content)}</div>

            <PostDetails post={post}/>
            {/* render comment form */}
            <CommentForm postId={post?._id}/>
          </div>

          {/* below render comments */}
          <Comments comments={post.comments}/>
        </div>
      )}
    </div>
  );
};

export default PostDetailsPage;
