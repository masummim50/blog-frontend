
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import ScrollResetWrapper from "./ScrollResetWrapper";

const Layout = () => {
  return (
    <ScrollResetWrapper>
      <div>
        <Header />
        <div className="l d mt-[40px] pt-2">
          <div className="">
            <Outlet />
          </div>
        </div>
        {/* add footer here */}
      </div>
    </ScrollResetWrapper>
  );
};

export default Layout;
