import  { useState } from "react";
import ProfileDrowdown from "./ProfileDrowdown";
import useBoundStore from "../../zustand/store";
import { FaPenFancy } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProfileIcon = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const userName = useBoundStore((state) => state.auth.userName);
  const avatarImage = useBoundStore((state) => state.auth.image);
  return (
    <div className="flex items-center cursor-pointer">
      <Link to={`/me/write`} className="p-4">
        <FaPenFancy className="p-1  text-4xl" />
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
              (userName as unknown as string).slice(0, 1)
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
