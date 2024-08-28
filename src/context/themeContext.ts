import { createContext } from "react";


type themeContextType = {
    darkTheme: boolean;
    setDarkTheme: React.Dispatch<React.SetStateAction<boolean>>;
  };
  
  const defaultTheme = {
    darkTheme: false,
    setDarkTheme: () => {},
  };
  
export const themeContext = createContext<themeContextType>(defaultTheme);