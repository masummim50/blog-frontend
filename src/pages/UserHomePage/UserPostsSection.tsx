import React from "react";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";
import { useOutletContext } from "react-router-dom";

const UserPostsSection = () => {
    const data = useOutletContext()
  return (
    <div className="mw">
      
        <BlogPostsContainer
          apiEndPoint={`post/${data}/posts`}
          queryKey="user-posts"
        />
      
    </div>
  );
};

export default UserPostsSection;
