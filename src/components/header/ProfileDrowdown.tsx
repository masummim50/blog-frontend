import React from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../zustand/authStore";

const ProfileDrowdown = ({
  showProfileDropdown,
  setShowProfileDropdown,
}: {
  showProfileDropdown: boolean;
  setShowProfileDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const removeUser = useAuthStore((state) => state.removeUser);
  const avatarIamge = useAuthStore((state) => state.auth.image);
  const handleClickOutside = (e: MouseEvent) => {
    const container = document.getElementById(
      "profile-dropdown"
    ) as HTMLElement;
    //  console.log("e target: ", e.target)
    if (e.target && (e.target as HTMLElement).id !== "profile-btn") {
      if (!container?.contains(e.target as HTMLElement)) {
        // console.log(e.target)
        // console.log("clicked outside");
        setShowProfileDropdown(false);
      }
    }
  };

  document.addEventListener("click", handleClickOutside);

  const userName = useAuthStore((state) => state.auth.userName);

  const links = [
    {
      title: "My Profile",
      url: `me/profile`,
    },
    {
      title: "My Blog",
      url: `${userName}/blog`,
    },
    {
      title: "Communities",
      url: `/communities`,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("blog-token");
    removeUser();
  };

  return (
    <div
      id="profile-dropdown"
      className={`absolute top-[100%] h-[90vh] bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out text-white overflow-hidden ${
        showProfileDropdown ? "right-0" : "right-[-100%]"
      }`}
    >
      <div
        className="h-[100px]"
        style={{
          backgroundImage: `url(${avatarIamge})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="min-w-[180px]">
        {links.map((link) => (
          <div key={link.title}>
            <Link
            preventScrollReset={true}
              className="py-2 pl-3  block border-b hover:bg-black/60"
              to={link.url}
            >
              {link.title}
            </Link>
          </div>
        ))}
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default ProfileDrowdown;
