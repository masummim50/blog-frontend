import {  useLayoutEffect, useRef, useState } from "react";

import { Post } from "./PostDetailsPage";
import useBoundStore from "../../zustand/store";
import { MdModeComment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../axios/axiosInstance";
import { queryClient } from "../../main";
import { Link } from "react-router-dom";

const PostDetails = ({ post }: { post: Post }) => {
  const user = useBoundStore((state) => state.auth);

  const smallContainerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  const handleScroll = () => {
    if (smallContainerRef.current) {
      const rect = smallContainerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // If the small container is above the viewport (scrolling up), remove sticky
      if (rect.top < 0) {
        setIsSticky(false);
      }
      // If the small container is below the viewport, apply sticky style
      else if (rect.top > viewportHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false); // If small container is within the viewport, remove sticky
      }
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll);

    window.scrollTo(0, 0);
    // Run handleScroll once on initial load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const likeMutation = useMutation({
    mutationFn: async (param: string) => {
      const response = await axiosInstance.patch(`/post/${param}/${post._id}`);
      return response.data;
    },
    onSuccess: (_, param) => {
      queryClient.setQueryData([`post${post._id}`], (oldData:any) => {
        console.log("param: ", param);
        if (param === "like") {
          const newLikeObject = {
            _id: user.id,
            userName: user.userName,
            coverImage: user?.image || "",
          };
          return {
            ...oldData,
            data: {
              ...oldData.data,
              likes: [...oldData.data.likes, newLikeObject],
            },
          };
        } else {
          const filterLikes = oldData.data.likes.filter(
            (l) => l._id !== user.id
          );
          return {
            ...oldData,
            data: {
              ...oldData.data,
              likes: filterLikes,
            },
          };
        }
      });
    },
  });

  const handleLike = ( param) => {
    likeMutation.mutate(param);
  };

  return (
    <div>
      <div ref={smallContainerRef}>
        <div
          className={`${
            !isSticky ? "" : "fixed bottom-0 z-1"
          } bg-gradient-to-r from-gray-900 to-transparent text-white font-bold backdrop-blur-md py-2  max-w-[620px] w-full`}
        >
          <div className="px-2">
            <div className="flex">
              <div className="flex items-center">
                <span className="ml-2">{post.likes.length}</span>
                <div
                  onClick={() =>
                    handleLike(
                      
                      post.likes.map((l) => l._id).includes(user.id || "")
                        ? "unlike"
                        : "like"
                    )
                  }
                >
                  {likeMutation.isPending ? (
                    <div className="size-5 border border-t-transparent border-sky-400  rounded-full animate-spin"></div>
                  ) : (
                    <AiFillLike
                      className={`hover:cursor-pointer hover:fill-sky-400${
                        post.likes.map((l) => l._id).includes(user.id || "")
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
            </div>
          </div>
        </div>
        {/* add tags section */}
        <div className="h-[1px] bg-gray-400 w-full my-4"></div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag, i) => (
            <Link preventScrollReset={true} className="bg-gray-300 dark:bg-gray-600 hover:bg-sky-400 text-black dark:text-white px-2 py-1 rounded-sm" to={`/trending/${tag}`} key={i}>
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
