import { ReactNode, useEffect, useState } from "react";
import { PaletteMode, Theme, ThemeProvider } from "@mui/material";
import { useAppSelector } from "../redux";

interface App {
  children: ReactNode;
}

const AppThemeProvider = (props: App) => {
  const theme: Theme = useAppSelector((state) => state.theme);

  useEffect(() => {}, [theme]);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
export { AppThemeProvider };
