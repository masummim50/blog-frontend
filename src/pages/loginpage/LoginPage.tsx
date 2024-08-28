import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import EmailInput from "../registerpage/EmailInput";
import { authQuery } from "../../axios/auth/authQuery";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import useAuthStore from "../../zustand/authStore";

const LoginPage = () => {
  const userId = useAuthStore((state)=> state.auth.id);
  const navigate = useNavigate();
  
  useEffect(()=> {
    if(userId){
      navigate("/")
    }
  },[userId])
  const setUser = useAuthStore((state) => state.setUser);
  // const navigate = useNavigate();
  // on successfull login=> get the token, set it to localstorage, decode the token, set the decoded value to zustand store

  // and auto fill up form with testing account button
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const loginButtonAvailable = () => {
    if (email !== "" && password !== "" && isEmailValid) return true;
    return false;
  };

  const signInMutation = useMutation({
    mutationFn: () => authQuery.signIn({ email, password }),
    onError: (error) => {
      console.log("sign in error: ", error);
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 400) {
          setErrorMessage(error.response.data.message);
          setTimeout(() => {
            setErrorMessage("");
          }, 2000);
        }
      } else {
        setErrorMessage("Unexpected error occured, try again");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
      }
    },
    onSuccess: (data) => {
      console.log("success login data: ", data);
      const payloadForStore = {
        token: data.token,
        id: data.data.id,
        userName: data.data.name,
        email: data.data.email,
      };
      setUser(payloadForStore);
      localStorage.setItem("blog-token", data.token);
      navigate(`/${data.data.name}/blog`);
    },
  });

  const [parent] = useAutoAnimate();
  const handleTestingAccountClick = () => {
    setEmail("user1@gmail.com")
    setIsEmailValid(true);
    setPassword('1234')
  }


  
  return (
    <div
      className={`min-h-screen bg-[url('../../../public/bg.jpg')] w-full bg-no-repeat bg-cover flex justify-center items-start pt-5`}
    >
      <div
        ref={parent}
        className="backdrop-blur-md rounded-md border-[1px] border-white  py-7 px-3 flex flex-col items-center min-w-[400px]"
      >
        <h2 className="text-2xl mb-8">Login</h2>
        <div className="text-right w-full">
          <button className="bg-white text-black rounded-md px-3 py-1" onClick={handleTestingAccountClick}>Use Testing Account</button>
        </div>
        <EmailInput
          email={email}
          setEmail={setEmail}
          isEmailValid={isEmailValid}
          setIsEmailValid={setIsEmailValid}
        />
        {/* <input
          className="bg-white/10 py-2 px-2 mb-4 w-full focus:outline-none outline-none text-white placeholder:text-white rounded-md"
          placeholder="Enter your Email"
          type="text"
        /> */}
        <input
          className="bg-white/10 py-2 px-2 mb-4 w-full focus:outline-none outline-none text-white placeholder:text-white rounded-md"
          placeholder="Enter your Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {errorMessage !== "" && <p className="text-red-500">{errorMessage}</p>}

        <button
          disabled={!loginButtonAvailable() || signInMutation.isPending}
          onClick={() => signInMutation.mutate()}
          type="submit"
          className="disabled:bg-gray-300 bg-white py-2 px-2  w-full focus:outline-none outline-none text-black rounded-md hover:bg-gray-200"
        >
          {signInMutation.isPending ? (
            <span className="flex items-center justify-center">
              Signing in...{" "}
              <span className="size-[20px] animate-spin border-black border-2 border-t-transparent inline-block rounded-full"></span>{" "}
            </span>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-white">
          {" "}
          Don't have an account?{" "}
          <Link className="font-bold underline" to={"/register"}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
