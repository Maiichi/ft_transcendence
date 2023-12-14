import { ReactNode, useEffect, useState } from "react";
import { PaletteMode, Theme, ThemeProvider, createTheme } from "@mui/material";
import { appColor } from "./AppColors";
import { useAppDispatch, useAppSelector } from "../redux";
import { setMode } from "./themeSlice";

interface App {
  children: ReactNode;
}

const AppThemeProvider = (props: App) => {
  const dispatch = useAppDispatch()
  const mode: PaletteMode =
    useAppSelector((state) => state.theme?.mode) || "light";
  const [theme, setTheme] = useState<Theme>(
    createTheme({
      palette: {
        mode: mode,
        primary: appColor,
        secondary: appColor,
      },
    })
  );
  useEffect(() => {
    // TODO: not add yet to provider stor
    dispatch(setMode('light'))
    setTheme((prevTheme) => ({
      ...prevTheme,
      mode: mode,
    }));
  }, [mode]);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
export { AppThemeProvider };
