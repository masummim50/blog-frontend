import ProfileIcon from "./ProfileIcon";
import logo from "/logo.png";
import Links from "./Links";
import { IoMdSunny } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { useContext } from "react";
import { themeContext } from "../../context/themeContext";
import { Link } from "react-router-dom";
import useBoundStore from "../../zustand/store";

const Header = () => {
  const id = useBoundStore((state) => state.auth.id);
  const { darkTheme, setDarkTheme } = useContext(themeContext);
  return (
    <div className="l d  w-full fixed top-0 z-50 border-b dark:border-b-black border-b-gray-500">
      <div className="m-auto max-w-[95vw] flex justify-between items-center">
        <div className="flex items-center">
          <Link to={"/"} preventScrollReset={true} className="hidden md:block">
            <img className="w-[100px]" src={logo} alt="" />
          </Link>
          <div className="links">
            <Links />
          </div>
        </div>
        <Link to={"/"} className="md:hidden block">
          <img className="w-[100px]" src={logo} alt="" />
        </Link>
        <div className="flex items-center">
          {/* add the logo component here */}
          {darkTheme ? (
            <IoMdSunny size={25} onClick={() => setDarkTheme(!darkTheme)} />
          ) : (
            <FaMoon size={25} onClick={() => setDarkTheme(!darkTheme)} />
          )}
          {/* profile icon should be conditional */}
          {/* if logged in show profile icon else show sign up or login option */}
          
          {id ? (
            <ProfileIcon />
          ) : (
            <div className="flex gap-1">
              <Link
                className="rounded-md border border-gray-300 px-2 py-1 inline-block hover:bg-gray-400 hover:text-black"
                to={"/login"}
              >
                Login
              </Link>
              <Link
                className="rounded-md border border-gray-300 px-2 py-1 inline-block hover:bg-gray-400 hover:text-black"
                to={"/register"}
              >
                Register
              </Link>
            </div>
          )}
          {/* <ProfileIcon /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
