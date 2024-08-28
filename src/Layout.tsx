import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="bg-gray-200 dark:bg-slate-950">
        <div className=" max-w-[1200px] p-2  m-auto">
          <Outlet />
        </div>
      </div>
      {/* add footer here */}
    </div>
  );
};

export default Layout;
