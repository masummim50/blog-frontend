import React from "react";

const LinksDropwdown = ({
    showLinksDropdown,
    setShowLinksDropdown,
}: {
    showLinksDropdown: boolean;
    setShowLinksDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleClickOutside = (e: MouseEvent) => {
    const container = document.getElementById(
      "links-dropdown"
    ) as HTMLElement;
    if (e.target && (e.target as HTMLElement).id !== "links-btn") {
      if (!container?.contains(e.target as HTMLElement)) {
        setShowLinksDropdown(false);
      }
    }
  };

  document.addEventListener("click", handleClickOutside);
  

  return (
    <div
      id="links-dropdown"
      className={`absolute top-[100%] h-[90vh] bg-gray-200 dark:bg-gray-800 flex flex-col transition-all duration-300 overflow-hidden ${
        showLinksDropdown ? 'left-0' : 'left-[-300px]'
      }`}
    >
      <button className="px-5">Not Useful</button>
    </div>
  );
};

export default LinksDropwdown;
