import React from "react";
import { BlogCardPropsType } from "../../types/BlogPostTypes";
import { blogPostedTime } from "../../utils/blogPostFunctions";

const BlogCard = ({ post }: { post: BlogCardPropsType }) => {
  return (
    <div className=" py-3 text-white">
      <div className="px-2">
        <div className="flex justify-between items-center">
          <div className="flex">
            {post.author.coverImage ? (
              <img className="w-[30px]" src={post.author.coverImage} alt="" />
            ) : (
              <div className="size-[30px] bg-white rounded-full">
                {post.author?.userName?.slice(0, 1)}
              </div>
            )}
            <div>
              <h2>{post.author.userName}</h2>
              {blogPostedTime(post.createdAt)}
            </div>
          </div>
          <div className="flex-grow text-right">
            <p>Own Blog</p>
          </div>
        </div>
        <p className="text-xl">{post.title}</p>
      </div>
        <img src={post.image} className="w-full my-2" alt="" />

        <div className="px-2">
            <div className="flex">
                <div>
                    <p>{post.likes} Likes</p>
                    <p>{post.comments} Comments</p>
                </div>
                <div className="flex-grow text-right">
                    <p>{post.views} Views</p>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BlogCard;
