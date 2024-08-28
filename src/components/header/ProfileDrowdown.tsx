import React from "react";

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
 
    if (e.target && (e.target as HTMLElement).id !== "profile-btn") {
      if (
        !container?.contains(e.target as HTMLElement) 
      ) {
        console.log("clicked outside");
        setShowProfileDropdown(false);
      }
    }
  };

  document.addEventListener("click", handleClickOutside);

  return (
    <div
      id="profile-dropdown"
      className={`absolute top-[100%] h-[90vh] bg-orange-300 transition-all duration-700 overflow-hidden ${
        showProfileDropdown ? "right-0" : "right-[-300px]"
      }`}
    >
      this is profile dropdown
      <button>button</button>
    </div>
  );
};

export default ProfileDrowdown;
