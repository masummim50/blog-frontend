import { useState, useRef, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import useAuthStore from "../../zustand/authStore";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import { queryClient } from "../../main";

const CommentForm = ({ postId }: { postId: string }) => {
  const userId = useAuthStore((state) => state.auth.id);
  const user = useAuthStore((state) => state.auth);
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Adjust the textarea height based on content
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset the height to auto so it can shrink if needed
      textarea.style.height = `${textarea.scrollHeight}px`; // Set height to the scroll height
    }
  };

  // Handle content change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const commentMutation = useMutation({
    mutationFn: async (commentData: {
      content: string;
      author: string;
      post: string;
    }) => {
      const comment = await axiosInstance.post(`/comment/create`, commentData);
      return comment.data;
    },
    onSuccess: (data) => {
      const newComment = {
        _id:data.data._id,
        content: data.data.content,
        author: {
          _id: user.id,
          userName: user.userName,
          coverImage: ''
        },
        replies: data.data.replies,
        createdAt: data.data.createdAt,
      };
      queryClient.setQueryData([`post${postId}`], (oldData) => {
        return {
          ...oldData, data: { ...oldData.data, comments: [...oldData.data.comments, newComment]},}
      })
    },
  });

  // Handle submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const commentData = { content, author: userId as string, post: postId };
    commentMutation.mutate(commentData);
    // Logic for submitting the content
    console.log("Submitted:", content);
    setContent(""); // Clear the content after submission
  };

  // Adjust height on content change
  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto mt-4">
      <div className="mb-">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={handleChange}
          placeholder="Write your comment..."
          rows={4}
          className="resize-none overflow-hidden w-full p-4  focus:outline-none  border-[1px] border-white/20 focus:ring-0 bg-gray-900/30"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={!content.trim()} // Disable if the textarea is empty
          className={` py-1 px-5  text-white flex items-center gap-1  ${
            content.trim()
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          <FaComment />{" "}
          {commentMutation.isPending ? (
            <span>
              Submitting...
              <span className="size-5 rounded-full border-2 border-t-transparent inline-block border-white animate-spin"></span>
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
