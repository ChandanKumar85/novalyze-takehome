import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "light" | "dark";

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AppContext = createContext<AppContextType>({
  theme: 'light',
  setTheme: (value) => (value),
  isAuthenticated: false,
  setIsAuthenticated: (value) => (value),
});

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || (!window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <AppContext.Provider value={{ theme, setTheme, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AppContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within an AppProvider");
  }
  return context;
};
