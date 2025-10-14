import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "celestial" | "high-contrast";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem("holy-ai-theme") as Theme) || defaultTheme
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark", "celestial", "high-contrast");
    
    if (theme === "dark") {
      root.classList.add("dark");
    } else if (theme === "celestial") {
      root.classList.add("dark");
      root.style.setProperty("--background", "15 35% 15%");
      root.style.setProperty("--primary", "25 88% 52%");
    } else if (theme === "high-contrast") {
      root.classList.add("dark");
      root.style.setProperty("--background", "0 0% 0%");
      root.style.setProperty("--foreground", "0 0% 100%");
    } else {
      root.classList.add("light");
    }
    
    localStorage.setItem("holy-ai-theme", theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
