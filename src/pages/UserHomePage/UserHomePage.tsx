import useAuthStore from "../../zustand/authStore";

import BlogPostsContainer from "../../components/BlogPostsContainer/BlogPostsContainer";

const UserHomePage = () => {
  const userid = useAuthStore((state) => state.auth.id);

  return (
    <div className="min-h-[100vh]">

    <BlogPostsContainer
      apiEndPoint={`post/${userid}/posts`}
      queryKey="user-posts"
      />
      </div>
  );
};

export default UserHomePage;
