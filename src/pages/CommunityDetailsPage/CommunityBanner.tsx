import React from "react";
import { formatDate } from "../../utils/blogPostFunctions";
import { Link } from "react-router-dom";
import RulesModal from "./RulesModal";
import CommunityButtons from "./CommunityButtons";
import useBoundStore from "../../zustand/store";
import CommunityEditModal from "./CommunityEditModal";

const CommunityBanner = ({ community }: { community: any }) => {
  const [showModal, setShowModal] = React.useState(false);
  const userId = useBoundStore((state) => state.auth.id);
  return (
    <div className="relative w-full min-h-64 mb-7 text-black dark:text-white">
      {/* Banner with background cover image or default color */}
      {userId === community?.creator?._id && (
            <CommunityEditModal community={community} />
          )}
      <div
        className={`w-full h-full py-5 ${
          community?.coverImage ? "" : "bg-white dark:bg-black"
        } bg-cover bg-center`}
        style={{
          backgroundImage: community?.coverImage
            ? `url(${community.coverImage})`
            : "none",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 "></div>

        {/* Avatar & Information */}
        <div className="relative z-0 flex flex-col text-white items-center justify-center h-full  px-4">
          {/* Avatar */}

          

          <div className="relative">
            {community?.image ? (
              <img
                src={community.image}
                alt={`${community?.communityName}'s avatar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800  flex items-center justify-center rounded-full border-4 border-white">
                <span className="text-3xl font-bold">
                  {community?.communityName?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          {/* community Information */}
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">
              {community?.name || "Unknown community"}
            </h1>
            <p>{community?.description || "No description"}</p>
          </div>
          <div className="flex gap-2">
            <h2 className="text-lg  px-5 py-1  rounded-md border-l-4 border-l-sky-700 backdrop-blur-sm bg-black/50 text-white">
              Members: {community?.members.length}
            </h2>
            <h2 className="text-lg  px-5 py-1  rounded-md border-r-4 border-r-sky-700 backdrop-blur-sm bg-black/50 text-white">
              Posts: {community?.posts.length}
            </h2>
          </div>
          <h2 className="text-lg">
            Created on: {formatDate(community?.createdAt)} by{" "}
            <Link
              className="text-sky-400 underline underline-sky-400"
              to={`/${community?.creator.userName}/blog`}
            >
              {community?.creator.userName}
            </Link>
          </h2>
          {/* subscribe and write a post button */}
          <CommunityButtons community={community} />

          <button
            onClick={() => setShowModal(true)}
            className="bg-sky-300 px-4 py-1 rounded-md text-black hover:bg-sky-400"
          >
            Rules
          </button>
          <RulesModal
            showModal={showModal}
            setShowModal={setShowModal}
            rules={community.rules}
          />
        </div>
      </div>
    </div>
  );
};

export default CommunityBanner;
