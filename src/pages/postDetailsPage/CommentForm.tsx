import Slider from "react-slick";
import { useState, useRef, useEffect } from "react";
import { FaComment } from "react-icons/fa";
import useBoundStore from "../../zustand/store";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import { queryClient } from "../../main";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CommentForm = ({ postId }: { postId: string }) => {
  const userId = useBoundStore((state) => state.auth.id);
  const user = useBoundStore((state) => state.auth);
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const comments = [
    "Very Informative",
    "Well written",
    "explained perfectly",
    "i love this post",
    "impressive",
  ];

  const settings = {
    className: "slider variable-width",
    arrows:false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    infinite:true,
    loop:true
  };
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
        _id: data.data._id,
        content: data.data.content,
        author: {
          _id: user.id,
          userName: user.userName,
          coverImage: "",
        },
        replies: data.data.replies,
        createdAt: data.data.createdAt,
      };
      queryClient.setQueryData([`post${postId}`], (oldData: any) => {
        return {
          ...oldData,
          data: {
            ...oldData.data,
            comments: [...oldData.data.comments, newComment],
          },
        };
      });
    },
  });

  // Handle submit
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const commentData = {
      content,
      author: userId as unknown as string,
      post: postId,
    };
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
    <>
      {userId ? (
        <form onSubmit={handleSubmit} className="w-full mx-auto mt-4">
          <div className="mb-">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={handleChange}
              placeholder="Write your comment..."
              rows={4}
              className="resize-none overflow-hidden w-full p-4  focus:outline-none  border-[1px] border-white/20 focus:ring-0 bg-gray-300 dark:bg-gray-900/30"
            />
          </div>
          <div className="flex justify-end">
            {/* the carousel */}
            
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
          <div className=" pt-5">
              <div className="slider-container">
                <Slider {...settings}>
                  {
                    comments.map((comment)=> <span onClick={()=> setContent(comment)}  className="border border-black dark:border-white rounded-md px-2 py-[1px] mr-1 block cursor-pointer">{comment}</span>)
                  }
                </Slider>
              </div>
            </div>
        </form>
      ) : (
        <h2>Login to comment</h2>
      )}
    </>
  );
};

export default CommentForm;
