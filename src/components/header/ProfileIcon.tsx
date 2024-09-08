import React, { useState } from "react";
import ProfileDrowdown from "./ProfileDrowdown";
import useAuthStore from "../../zustand/authStore";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const userName = useAuthStore((state) => state.auth.userName);
  const avatarImage = useAuthStore((state) => state.auth.image);
  return (
    <div className="flex items-center cursor-pointer">
      <Link to={`/${userName}/write`} className="">
        <FaPenFancy className="p-1 hover:bg-black rounded-full" size={32} />
      </Link>
      <div
        className=" flex items-center h-full w-full justify-center "
        id="profile-btn"
        onClick={() => {
          setShowProfileDropdown(!showProfileDropdown);
        }}
      >
        {/* <IoPersonCircle id="profile-btn" size={35} /> */}
        <div
          id="profile-btn"
          className="size-[40px] text-xl rounded-full bg-black text-white flex justify-center items-center"
        >
          {
            avatarImage ? (
              <img
                id="profile-btn"
                src={avatarImage}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              userName?.slice(0, 1)
            ) 
          }
        </div>
        <p id="profile-btn" className=" underline ">
          {userName}
        </p>
        {/* <IoIosArrowDown id="profile-btn" size={10}/> */}
      </div>
      <ProfileDrowdown
        showProfileDropdown={showProfileDropdown}
        setShowProfileDropdown={setShowProfileDropdown}
      />
    </div>
  );
};

export default ProfileIcon;
