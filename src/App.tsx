import {  useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { themeContext } from "./context/themeContext";
// import useBoundStore from "./zustand/authStore";
import { jwtDecode } from "jwt-decode";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "./axios/axiosInstance";
import useBoundStore from "./zustand/store";
import Lenis from "lenis";
function App() {
  const setUser = useBoundStore((state) => state.setUser);

  const setUserImage = useBoundStore((state) => state.setUserImage);
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  // as soon as it renders, get the token from local storage and set it in the header
  const token = localStorage.getItem("blog-token");
  if (token) {
    // if there is token that means the user is logged in so, fetch teh avatar image here
    const decoded = jwtDecode(token) as {
      _id: string;
      name: string;
      email: string;
    };
    const payload = {
      token,
      id: decoded._id,
      userName: decoded.name,
      email: decoded.email,
      image: null,
    };

    setUser(payload);

    axiosInstance.get("/users/avatar").then((data) => {
      const image = data.data.data.avatarImage;
      console.log("retrieved image link: ", image);
      setUserImage(image);
      console.log("set image link");
    });
  }

    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);


  return (
    <themeContext.Provider value={{ darkTheme, setDarkTheme }}>
      <div className={`${darkTheme ? "dark" : ""}`}>
        <ToastContainer
          position="bottom-right"
          autoClose={1200}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <div className="dark:bg-orange-950 bg-white">
          <AppRouter />
        </div>
      </div>
    </themeContext.Provider>
  );
}

export default App;
