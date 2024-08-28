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
  return (
    <div className="flex items-center cursor-pointer">
      <Link to={`/${userName}/write`} className="">
        <FaPenFancy className="p-1 hover:bg-black rounded-full" size={32} />
      </Link>
      <div
        className="flex items-center h-full w-full justify-center "
        id="profile-btn"
        onClick={() => {
          setShowProfileDropdown(!showProfileDropdown);
        }}
      >
        <IoPersonCircle id="profile-btn" size={35} />
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
