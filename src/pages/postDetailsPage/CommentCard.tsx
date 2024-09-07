import React from "react";
import { Comment } from "./PostDetailsPage";
import { blogPostedTime } from "../../utils/blogPostFunctions";

const CommentCard = ({ comment }: { comment: Comment }) => {
  return (
    <div className="mb-3">
      <div className="flex items-start">
        <div className="size-8 bg-black rounded-full flex justify-center items-center">
          {comment.author.coverImage ? (
            <img src={comment.author.coverImage} alt="" />
          ) : (
            comment.author.userName.slice(0, 1)
          )}
        </div>

        <div className="flex-grow">
          <div className="flex items-center gap-1">
            <div className="font-semibold">{comment.author.userName}</div>
            <span className="size-1 bg-white rounded-full"></span>
            <div className="text-xs text-gray-400">
              {blogPostedTime(comment.createdAt)}
            </div>
          </div>
          <h2 className="text-base text-white">{comment.content}</h2>
        </div>
      </div>
      <button>Reply</button>
    </div>
  );
};

export default CommentCard;
