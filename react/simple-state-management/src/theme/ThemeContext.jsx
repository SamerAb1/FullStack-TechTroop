import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  const [fontSize, setFontSize] = useState(
    () => localStorage.getItem("fontSize") || "medium"
  );

  useEffect(() => localStorage.setItem("theme", theme), [theme]);
  useEffect(() => localStorage.setItem("fontSize", fontSize), [fontSize]);

  const value = useMemo(
    () => ({ theme, setTheme, fontSize, setFontSize }),
    [theme, fontSize]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>.");
  }
  return ctx;
}
