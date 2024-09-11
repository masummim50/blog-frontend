import React from "react";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";
import { useOutletContext } from "react-router-dom";

const UserPostsSection = () => {
    const data = useOutletContext();
    console.log("context data: ", data)
  return (
    <div className="mw p-2">
      
        <BlogPostsContainer
          apiEndPoint={`post/${data}/posts`}
          queryKey={`user-${data}`}
        />
      
    </div>
  );
};

export default UserPostsSection;
