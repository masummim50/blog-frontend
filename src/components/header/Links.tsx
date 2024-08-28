import { useState } from "react";
import { IoMdMenu } from "react-icons/io";

import LinksDropwdown from "./LinksDropdown";
import HeaderLinks from "./HeaderLinks";

const Links = () => {
  const [showLinksDropdown, setShowLinksDropdown] = useState(false);
  return (
    <div>
      <div className="hidden md:block">
        <HeaderLinks/>
      </div>

      <div className="block md:hidden">
        <IoMdMenu
          className="cursor-pointer text-[40px] hover:bg-slate-900 text-white"
          id="links-btn"
          onClick={() => setShowLinksDropdown(!showLinksDropdown)}
        />

        <LinksDropwdown
          showLinksDropdown={showLinksDropdown}
          setShowLinksDropdown={setShowLinksDropdown}
        />
      </div>
    </div>
  );
};

export default Links;
