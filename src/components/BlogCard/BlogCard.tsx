import React from "react";
import { BlogCardPropsType } from "../../types/BlogPostTypes";
import { blogPostedTime } from "../../utils/blogPostFunctions";
import { AiFillLike } from "react-icons/ai";import { MdModeComment } from "react-icons/md";
import { FaEye } from "react-icons/fa";


import { Link } from "react-router-dom";

const BlogCard = ({ post }: { post: BlogCardPropsType }) => {
 
  return (
    <Link
      to={`/post/${post._id}`}
      className="bg-gray-200 dark:bg-gray-700/40 hover:bg-gray-300 hover:dark:bg-gray-700 py-3 block text-black dark:text-white mb-3"
    >
      <div className="px-2">
        <div className="flex justify-between items-center">
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
          <div className="flex-grow text-right">
            {
              post.community ? 'Community' : 'Blog'
            }
          </div>
        </div>
        <p className="text-base font-semibold">{post.title}</p>
      </div>
      <img src={post.image} className="w-full my-2 min-h-[100px] transition-all" alt="" />

      <div className="px-2">
        <div className="flex">
          <div className="flex items-center">
            <span className="ml-2">{post.likes.length}</span>
            <AiFillLike />
            <div className="size-1 bg-white rounded-full ml-2"></div>
            <span className="ml-2">{post.comments.length}</span>
            <MdModeComment className="mt-[4px]" />
          </div>

          <div className="flex-grow text-right">
           {post.views} views
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
