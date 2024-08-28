import { useQuery } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { authQuery } from "../../axios/auth/authQuery";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const NameInput = ({
  userName,
  userNameAvailable,
  setUserName,
  setUserNameAvailable,
}: {
  userName: string;
  userNameAvailable: boolean;
  setUserName: Dispatch<SetStateAction<string>>;
  setUserNameAvailable: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    data,
    isSuccess,
    isFetching,
    refetch: refetchAvailCheck,
    isRefetching,
  } = useQuery({
    queryFn: () => authQuery.checkUserNameAvailiblity(userName),
    queryKey: ["checkUserNameAvailiblity"],
    enabled: false,
  });

  useEffect(() => {
    console.log("avail check: ", data);
    if (data?.data && isSuccess && !isRefetching) {
      setUserNameAvailable(true);
    } else {
      setUserNameAvailable(false);
      setShowUserNameNotAvailable(true);
      setTimeout(() => {
        setShowUserNameNotAvailable(false);
      }, 1000);
    }
  }, [data, isSuccess, refetchAvailCheck, isRefetching]);

  const [checkedValue, setCheckedValue] = React.useState("");
  const [showUserNameNotAvailable, setShowUserNameNotAvailable] =
    React.useState(false);

  const handleOnBlur = () => {
    if (userName !== "") {
      if (userName !== checkedValue) {
        setUserNameAvailable(false);
        setCheckedValue(userName);
        refetchAvailCheck();
      }
    }
  };
  // if user name available then no border, if not a red border and a message

  const [parent] = useAutoAnimate();
  return (
    <div ref={parent} className="relative my-2">
      <input
        required
        name="userName"
        value={userName}
        onChange={(e) => {
          setUserNameAvailable(false);
          setUserName(e.target.value);
        }}
        className={`bg-white/10 py-2 px-2  w-full focus:outline-none outline-none text-white placeholder:text-white rounded-md relative focus:border-transparent ${
          isFetching && "border-transparent"
        } ${
          userNameAvailable
            ? "border-green-500 border-2"
            : !userNameAvailable && userName !== ""
            ? "border-2 border-red-500"
            : "border-transparent"
        }`}
        placeholder="Enter an unique username"
        onBlur={handleOnBlur}
        type="text"
      />
      {isFetching && (
        <div className="absolute top-[50%] translate-y-[-50%]  right-0  ">
          <div className=" size-[20px] animate-spin border-2 border-t-transparent border-white rounded-full "></div>
        </div>
      )}
      {showUserNameNotAvailable && userName !== "" && !isRefetching && (
        <p className="text-white">User name not available</p>
      )}
    </div>
  );
};

export default NameInput;
