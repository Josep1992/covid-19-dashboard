import * as React from "react";
import { getPersistentState, setPersistentState } from "../utils/index";

interface Props {
  children: React.ReactNode;
}

type scheme = "light" | "dark"

interface Theme {
  value: scheme
}

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme: scheme) => void
};


const ThemeContext = React.createContext<Partial<ThemeContextType>>({});

export const ThemeProvider = ({ children }: Props): React.ReactElement => {
  const [theme, setTheme] = React.useState<scheme>("light");

  React.useEffect(() => {
    const state = getPersistentState("theme");
    if(state){
      setTheme(state);
    }
  },[])

  React.useEffect(() => {
    setPersistentState("theme",theme)
  },[theme])

  return (
    <ThemeContext.Provider value={{setTheme, theme:{value:theme}}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("Use inside a Theme Context Provider");
  }

  return {
    setTheme: context.setTheme,
    theme: context.theme
  }
};