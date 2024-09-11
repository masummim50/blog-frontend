

const UserHomePage = () => {
  // const userid = useAuthStore((state) => state.auth.id);
  // const { username } = useParams();
  // console.log(username);

  // const { data, isLoading, isSuccess } = useQuery({
  //   queryKey: [username],
  //   queryFn: async () => {
  //     const user = await axiosInstance.get(`/users/profile/${username}`);
  //     return user.data;
  //   },
  // });

  return (
    <div className="min-h-[100vh]">
      {/* render user banner, get user details by username and then use the id to fetch the rest of the post */}
      {/* {isLoading && <h2>Loding user profile</h2>}

      {isSuccess && data && <UserBanner user={data.data} />}

      <div className="mw">
        {isSuccess && (
          <BlogPostsContainer
            apiEndPoint={`post/${data.data._id}/posts`}
            queryKey="user-posts"
          />
        )}
      </div> */}
    </div>
  );
};

export default UserHomePage;
