import { useQuery } from "@tanstack/react-query";

import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { axiosInstance } from "../../axios/axiosInstance";
import UserBanner from "./UserBanner";

const UserHomePageLayout = () => {
  const { username } = useParams();
  const {pathname} = useLocation()
  console.log("pathname: ", pathname)
  console.log(username);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: [username],
    queryFn: async () => {
      const user = await axiosInstance.get(`/users/profile/${username}`);
      return user.data;
    },
  });
  return (
    <div className="min-h-[100vh]">
      {isLoading && <div className="min-h-[100px] flex items-center justify-center">Loading Profile Info... <span className="inline-block size-5 border border-t-transparent rounded-full animate-spin"></span></div>}

      {isSuccess && data && <UserBanner user={data.data} />}

      {isSuccess && (
        <div className="mw flex">
          <Link className={`px-3 py-1 rounded-md border-gray-400 border ${pathname === `/${username}/blog` ? 'bg-sky-600' : ''} `} to={``}>
            Posts
          </Link>
          <Link
            className={`px-3 py-1 rounded-md border-gray-400 border  ${pathname === `/${username}/blog/shares` ? 'bg-sky-600' : ''}`}
            to={`shares`}
          >
            Shares
          </Link>
        </div>
      )}

      {isSuccess && <Outlet context={data.data._id} />}
    </div>
  );
};

export default UserHomePageLayout;
