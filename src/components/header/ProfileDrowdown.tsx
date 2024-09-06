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
  const handleClickOutside = (e: MouseEvent) => {
    const container = document.getElementById(
      "profile-dropdown"
    ) as HTMLElement;
 console.log("e target: ", e.target)
    if (e.target && (e.target as HTMLElement).id !== "profile-btn") {
      if (
        !container?.contains(e.target as HTMLElement)
      ) {
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
      title: "My Blog",
      url: `${userName}/blog`
    },
    {
      title: "All posts",
      url: `${userName}/allposts`
    }
  ]

  return (
    <div
      id="profile-dropdown"
      className={`absolute top-[100%] h-[90vh] bg-black/50 backdrop-blur-sm transition-all duration-300 ease-in-out overflow-hidden ${
        showProfileDropdown ? "right-0" : "right-[-100%]"
      }`}
    >
      
      <div className="h-[200px]">Profile section</div>
      <div>
        {
          links.map((link) => (
            <div key={link.title}>
              <Link to={link.url}>
                {link.title}
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default ProfileDrowdown;
