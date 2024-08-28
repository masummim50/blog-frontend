import  { ChangeEvent, Dispatch, SetStateAction } from "react";
import { checkEmailValidity } from "../../utils/emailHelpers";




const EmailInput = ({
  email,
  setEmail,
  isEmailValid,
  setIsEmailValid,
}: {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  isEmailValid: boolean;
  setIsEmailValid: Dispatch<SetStateAction<boolean>>;
}) => {

    const handleOnchange = (e:ChangeEvent<HTMLInputElement>)=> {
        setEmail(e.target.value)
        setIsEmailValid(checkEmailValidity(e.target.value))
    }


  return (
    <input
      required
      name="email"
      value={email}
      onChange={(e) => handleOnchange(e)}
      className={`${email === "" && 'border-transparent'} bg-white/10 py-2 px-2  w-full focus:outline-none outline-none text-white placeholder:text-white rounded-md autofill:bg-white/10 autofill:text-red-700 my-2 border-2 ${isEmailValid ? 'border-green-500' : 'border-red-500'}`}
      placeholder="Enter your Email"
      type="email"
    />
  );
};

export default EmailInput;
