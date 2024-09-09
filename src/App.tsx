import { useState } from "react";
import "./App.css";
import AppRouter from "./AppRouter";
import { themeContext } from "./context/themeContext";
import useAuthStore from "./zustand/authStore";
import { jwtDecode } from "jwt-decode";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const setUser = useAuthStore((state) => state.setUser);
  const [darkTheme, setDarkTheme] = useState<boolean>(true);
  // as soon as it renders, get the token from local storage and set it in the header
  const token = localStorage.getItem("blog-token");
  if (token) {
    const decoded = jwtDecode(token) as {
      _id: string;
      name: string;
      email: string;
      image: string;
    };
    console.log(decoded);
    const payload = {
      token,
      id: decoded._id,
      userName: decoded.name,
      email: decoded.email,
      image: decoded.image,
    };
    setUser(payload);
  }
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
