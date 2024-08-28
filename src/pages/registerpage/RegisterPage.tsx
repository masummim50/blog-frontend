import { useMutation } from "@tanstack/react-query";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { authQuery } from "../../axios/auth/authQuery";
import { isAxiosError } from "axios";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const RegisterPage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState("");
  const [userNameAvailable, setUserNameAvailable] = React.useState(true);

  const [email, setEmail] = React.useState("");
  const [isEmailValid, setIsEmailValid] = React.useState(false);

  const [password, setPassword] = React.useState("");

  const [errorMessage, setErrorMessage] = React.useState("");

  const [signUpSuccess, setSignUpSuccess] = React.useState(false);

  const createUserMutation = useMutation({
    mutationFn: () => authQuery.signUp({ userName, email, password }),
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        if (error.response.status === 409) {
          console.error("Duplicate email error:", error.response.data);
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
    onSuccess: () => {
      setSignUpSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
  });

  const handleSignup = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      createUserMutation.mutate();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const checkFormValid = () => {
    if (
      userName !== "" &&
      email !== "" &&
      password !== "" &&
      isEmailValid &&
      userNameAvailable
    ) {
      return true;
    }
    return false;
  };

  const [parent] = useAutoAnimate()
  return (
    <div
      className={`min-h-screen bg-[url('../../../public/bg.jpg')] w-full bg-no-repeat bg-cover flex justify-center items-start pt-5`}
    >
      <div className="backdrop-blur-md rounded-md border-[1px] border-white  py-7 px-3 flex flex-col items-center w-full max-w-[400px]">
        <h2 className="text-3xl mb-8 text-white font-semibold">Register</h2>
        <form ref={parent} className="w-full">
          <NameInput
            userName={userName}
            setUserName={setUserName}
            userNameAvailable={userNameAvailable}
            setUserNameAvailable={setUserNameAvailable}
          />

          <EmailInput
            email={email}
            setEmail={setEmail}
            isEmailValid={isEmailValid}
            setIsEmailValid={setIsEmailValid}
          />

          <input
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/10 py-2 px-2 mb-2  w-full focus:outline-none outline-none text-white placeholder:text-white rounded-md"
            placeholder="Enter your Password"
            type="password"
          />
          {/* if an error occurs from the server */}
          {
            errorMessage && 
          
          <span
            className={`text-left text-red-700  block w-full `}
          >
            {errorMessage}
          </span>
}
          {signUpSuccess && (
            <span
              className={`text-center text-white  block w-full `}
            >
              Sign up successful, redirecting...
            </span>
          )}

          <button
            disabled={!checkFormValid() || createUserMutation.isPending}
            onClick={(e) => handleSignup(e)}
            type="submit"
            className="disabled:bg-gray-300 bg-white py-2 px-2  w-full focus:outline-none outline-none text-black rounded-md hover:bg-gray-200"
          >
            {createUserMutation.isPending ? (
              <span className="flex items-center justify-center">
                Registering...{" "}
                <span className="size-[20px] animate-spin border-black border-2 border-t-transparent inline-block rounded-full"></span>{" "}
              </span>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-white">
          Already have an account?
          <Link className="font-bold underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
