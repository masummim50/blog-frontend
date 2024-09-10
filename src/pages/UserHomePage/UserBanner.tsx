import React from "react";

const UserBanner = ({ user }: { user: any }) => {
  return (
    <div className="relative w-full h-64 mb-7 text-black dark:text-white">
      {/* Banner with background cover image or default color */}
      <div
        className={`w-full h-full ${
          user?.coverImage ? "" : "bg-white dark:bg-black"
        } bg-cover bg-center`}
        style={{
          backgroundImage: user?.coverImage
            ? `url(${user.coverImage})`
            : "none",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 "></div>

        {/* Avatar & Information */}
        <div className="relative z-10 flex flex-col text-white items-center justify-center h-full  px-4">
          {/* Avatar */}
          <div className="relative">
            {user?.avatarImage ? (
              <img
                src={user.avatarImage}
                alt={`${user?.userName}'s avatar`}
                className="w-24 h-24 rounded-full object-cover border-4 border-white"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800  flex items-center justify-center rounded-full border-4 border-white">
                <span className="text-3xl font-bold">
                  {user?.userName?.[0]?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>

          {/* User Information */}
          <div className="mt-4 text-center">
            <h1 className="text-xl font-bold">
              {user?.userName || "Unknown User"}
            </h1>
            <p className="text-sm">{user?.email || "No email available"}</p>
            <p className="mt-2">{user?.info || "No additional information"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBanner;
