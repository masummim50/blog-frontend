import useAuthStore from "../../zustand/authStore";

import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";

const UserHomePage = () => {
  const userid = useAuthStore((state) => state.auth.id);

  return <BlogPostsContainer apiEndPoint={`post/${userid}/posts`} queryKey="user-posts" />;
};

export default UserHomePage;
