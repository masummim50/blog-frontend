
import { useEffect } from "react";
import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";

const ExplorePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-[100vh] mw pt-7 px-2">
      <BlogPostsContainer apiEndPoint="/post" queryKey="posts" />
    </div>
  );
};

export default ExplorePage;
