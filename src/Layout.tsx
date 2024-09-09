import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="l d mt-[40px] pt-2">
        <div className="">

          <Outlet />

        </div>
      </div>
      {/* add footer here */}
    </div>
  );
};

export default Layout;
