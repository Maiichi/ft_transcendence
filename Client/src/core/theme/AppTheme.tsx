import { ReactNode, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux";

interface App {
  children: ReactNode;
}

const AppThemeProvider = (props: App) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme);

  useEffect(() => {}, [theme]);

  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
export { AppThemeProvider };
