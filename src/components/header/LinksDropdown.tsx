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
      className={`absolute top-[100%] h-[90vh] bg-blue-300 transition-all duration-300 overflow-hidden ${
        showLinksDropdown ? 'left-0' : 'left-[-300px]'
      }`}
    >
      this is links dropdown
      <button>button</button>
    </div>
  );
};

export default LinksDropwdown;
