import * as React from "react";
import { getPersistentState, setPersistentState } from "../utils/index";
import {Icon } from "../ui/components/index";

interface Props {
  children: React.ReactNode;
}

type scheme = "light" | "dark"

interface Theme {
  value: scheme
}

interface Colors {
  light: string,
  dark: string
}

export type ThemeContextType = {
  theme: Theme
  setTheme: (theme: scheme) => void,
  isLight: boolean,
  colors: Colors,
  icon: React.ReactNode
};

// @dark Color for theme #161822


const ThemeContext = React.createContext<Partial<ThemeContextType>>({});

export const ThemeProvider = ({ children }: Props): React.ReactElement => {
  const [theme, setTheme] = React.useState<scheme>("light");
  const isLight: boolean = theme === "light" ? true : false;

  React.useEffect(() => {
    const state = getPersistentState("theme");
    if (state) {
      setTheme(state);
    }
  }, [])

  React.useEffect(() => {
    setPersistentState("theme", theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      setTheme,
      theme: { value: theme },
      isLight,
      colors: {
        dark: "#121212",
        light: "rgba(100%, 100%, 100%,87%)"
      },
      icon: (
        <Icon
          size={"lg"}
          type={isLight ? "faMoon" : "faSun"}
          inverse={!isLight}
          onClick={() => setTheme(isLight ? "dark" : "light")}
        />
      )
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = React.useContext(ThemeContext);

  if (!context) {
    throw new Error("Use inside a Theme Context Provider");
  }

  const isLight:boolean = context.theme.value === "light" ? true : false;

  return {
    setTheme: context.setTheme,
    theme: context.theme,
    isLight,
    colors: {
      dark: "#121212",
      light: "rgba(100%, 100%, 100%,87%)"
    },
    icon: (
      <Icon
        size={"lg"}
        type={isLight ? "faMoon" : "faSun"}
        inverse={!isLight}
        onClick={() => context.setTheme(isLight ? "dark" : "light")}
      />
    )
  }
};

export const withTheme = (WrappedComponent): React.ReactElement => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(context) => {
          return <WrappedComponent {...context}/>
        }}
      </ThemeContext.Consumer>
    </ThemeProvider>
  )
}