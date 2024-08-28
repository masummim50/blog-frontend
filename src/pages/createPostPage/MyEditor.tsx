import {  useEffect, useRef, useState } from "react";
import parse from "html-react-parser";

import "react-quill/dist/quill.snow.css";
import Quill from "./Quill";
import UploadImage from "./UploadImage";
import Tags from "./Tags";
import { posts } from "./PostData";



const MyEditor = () => {
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

  const handleCreatePost = () => {
    const postData = {
      title,
      content:value,
      tags:tags,
      image: image
    }

    console.log(postData)
    // use react query mutation to send a request to create a post
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="col-span-1 h-[90vh]  overflow-y-scroll no-scrollbar flex flex-col">
        <div className="text-right">
          <button
            onClick={generateRandomPost}
            className="rounded-md px-3 py-[2px] border border-gray-600"
          >
            Generate Random
          </button>
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

        <div className="flex justify-end ">
          <button
            disabled={!formFilled}
            onClick={handleCreatePost}
            className={`bg-green-600 text-white font-semibold hover:bg-green-700 px-7 py-1 rounded-md ${
              !formFilled ? "cursor-not-allowed opacity-70" : "cursor-pointer"
            } `}
          >
            Publish
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
