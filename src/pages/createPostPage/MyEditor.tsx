import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";

import "react-quill/dist/quill.snow.css";
import Quill from "./Quill";
import UploadImage from "./UploadImage";
import Tags from "./Tags";
import { posts } from "./PostData";
import { axiosInstance } from "../../axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { Bounce, toast } from "react-toastify";
import useBoundStore from "../../zustand/store";
import { useNavigate } from "react-router-dom";
import SelectCommunity from "./SelectCommunity";

interface PostDataType {
  title: string;
  content: string;
  tags: string[];
  image: string;
}

const MyEditor = () => {
  const community = useBoundStore((state) => state.community);
  const userName = useBoundStore((state) => state.auth.userName);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [value, setValue] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const [formFilled, setFormFilled] = useState(false);

  useEffect(() => {
    if (title && value && tags.length > 0) {
      setFormFilled(true);
    }
  }, [title, value, tags]);

  const titleRef = useRef<HTMLInputElement>(null);

  const generateRandomPost = () => {
    const post = posts[Math.floor(Math.random() * posts.length)];
    setTitle(post.title);
    setImage(post.images[Math.floor(Math.random() * post.images.length)]);
    setValue(post.value);
    setTags(post.tags);
  };

  // Define the mutation outside handleCreatePost
  const mutation = useMutation({
    mutationFn: async (postData: PostDataType) => {
      return axiosInstance.post("/post/create", postData);
    },
    onSuccess: (data) => {
      console.log("Post created successfully:", data);
      toast.success("Post Published Successfully", {
        position: "bottom-right",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setTitle("");
      setValue("");
      setTags([]);
      setImage("");
      navigate(`/${userName}/blog`);
      // Handle successful post creation (e.g., redirect or show success message)
    },
    onError: (error) => {
      console.error("Error creating post:", error);
      // Handle error (e.g., show error message)
    },
  });

  const handleCreatePost = () => {
    const postData = {
      title,
      content: value,
      tags: tags,
      image: image,
      community: community.id,
    };

    console.log(postData);
    mutation.mutate(postData);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="col-span-1 mb-7 h-[100vh] overflow-y-scroll no-scrollbar flex flex-col">
        <div className="flex justify-between items-center py-3">
          <button
            onClick={generateRandomPost}
            className="rounded-md px-3 py-[2px] border border-gray-600 hover:border-gray-400"
          >
            Generate Random
          </button>

          <SelectCommunity community={community} />
        </div>
        <input
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required
          className={` rounded-md border-[1px] mb-3 p-2 text-black border-gray focus:outline-none w-full text-lg`}
          placeholder="Enter title"
        />

        <UploadImage image={image} setImage={setImage} />

        <Quill value={value} setValue={setValue} />

        <Tags tags={tags} setTags={setTags} />

        <div className="flex justify-end fixed bottom-0 left-0 w-full bg-gray-200 dark:bg-gray-800 p-3">
          <button
            disabled={!formFilled || mutation.isPending}
            onClick={handleCreatePost}
            className={`bg-green-600 text-white font-semibold hover:bg-green-700 px-7 py-1 rounded-md ${
              !formFilled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            } `}
          >
            {mutation.isPending ? <span className="flex items-center">Publishing... <span className="inline-block size-5 border-[3px] border-white dark:border-white border-t-transparent dark:border-t-transparent rounded-full animate-spin"></span></span> : "Publish"}
          </button>
        </div>
      </div>

      <div className="col-span-1 h-[90vh] overflow-y-scroll no-scrollbar">
        <span className="font-bold">Title</span>
        <h2 className="text-2xl font-semibold mb-4 border-b-2 border-black/20">
          {title}
        </h2>
        {image && (
          <img
            src={image}
            alt="thumbnail"
            className="h-[400px] w-full object-cover object-center"
          />
        )}
        {value ? (
          parse(value)
        ) : (
          <span className="opacity-50">Start typing to see preview...</span>
        )}
      </div>
    </div>
  );
};

export default MyEditor;
