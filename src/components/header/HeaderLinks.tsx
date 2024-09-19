import  { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import CommunitiesDropdown from "./CommunitiesDropdown";
import useBoundStore from "../../zustand/store";

const feedLinks = [
  {
    title: "Community Feed",
    src: "/community/feed",
  },
  {
    title: "Following Feed",
    src: "/community/feed",
  },
  {
    title: "Favorite Feed",
    src: "/community/feed",
  },
];

const HeaderLinks = () => {
  const userId = useBoundStore((state) => state.auth.id);
  const [showCommunity, setShowCommunity] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    const container = document.getElementById(
      "community-dropdown"
    ) as HTMLElement;
    if (e.target) {
      if (!container?.contains(e.target as HTMLElement)) {
        setShowCommunity(false);
      }
    }
  };

  document.addEventListener("click", handleClickOutside);

  return (
    <div className="ml-3 flex items-center">
      <div className="relative group py-3 pr-6 px-3 l d hover:cursor-pointer">
        <div className="flex items-end">
          Feeds{" "}
          <span>
            <MdOutlineKeyboardArrowDown />
          </span>
        </div>
        <div className="absolute left-0 top-100 mt-3 hidden group-hover:block">
          {feedLinks.map((link, index) => {
            return (
              <Link
                key={index}
                className="block p-2 l d w-[200px]  cursor-pointer "
                to={link.src}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="relative group py-3 pr-6 px-3 l d hover:cursor-pointer">
        <div className="flex items-end">
          Feeds{" "}
          <span>
            <MdOutlineKeyboardArrowDown />
          </span>
        </div>
        <div className="absolute left-0 top-100 mt-3 hidden group-hover:block">
          {feedLinks.map((link, index) => {
            return (
              <Link
                key={index}
                className="block p-2 l d w-[200px]  cursor-pointer "
                to={link.src}
              >
                {link.title}
              </Link>
            );
          })}
        </div>
      </div>

      {/* only render this if a user is logged in, else use a link */}
      {userId ? (
        <div
          className="relative py-3 pr-6 px-3 l d hover:cursor-pointer"
          id="community-dropdown"
        >
          <div
            onClick={() => setShowCommunity(!showCommunity)}
            className="flex items-end"
          >
            Communities{" "}
            <span>
              <MdOutlineKeyboardArrowDown />
            </span>
          </div>

          <CommunitiesDropdown showCommunity={showCommunity} />
          {/* <div
          className={`absolute left-0 top-100 mt-3 ${
            showCommunity ? "block" : "hidden"
          } h-[50vh] bg-gray-600 w-[200px]`}
        >
          {feedLinks.map((link, index) => {
            return (
              <Link
                key={index}
                className="block p-2 l d w-[200px]  cursor-pointer "
                to={link.src}
              >
                {link.title}
              </Link>
            );
          })}
        </div> */}
        </div>
      ) : (
        <Link to="/communities">Communities</Link>
      )}
    </div>
  );
};

export default HeaderLinks;
