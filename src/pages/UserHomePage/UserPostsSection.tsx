import React from "react";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";
import { useOutletContext } from "react-router-dom";

const UserPostsSection = () => {
    const data = useOutletContext();
    console.log("context data: ", data)
  return (
    <div className="mw">
      
        <BlogPostsContainer
          apiEndPoint={`post/${data}/posts`}
          queryKey={`user-${data}`}
        />
      
    </div>
  );
};

export default UserPostsSection;
