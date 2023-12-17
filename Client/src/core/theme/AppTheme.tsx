import { ReactNode, useEffect } from "react";
import { CssBaseline, Theme, ThemeProvider, createTheme } from "@mui/material";
import { useAppSelector } from "../redux";

interface App {
  children: ReactNode;
}

const AppThemeProvider = (props: App) => {
  const themeState: Theme = useAppSelector((state) => state.theme);

  useEffect(() => {}, [themeState]);

  return (
    <ThemeProvider theme={themeState}>
      {/* TODO: every thing changed on the theme store must be here like palette
      mode */}
      <ThemeProvider
        theme={(theme) =>
          createTheme({ ...theme, palette: { mode: themeState.palette.mode } })
        }
      >
        <CssBaseline />
        {props.children}
      </ThemeProvider>
    </ThemeProvider>
  );
};

export default AppThemeProvider;
export { AppThemeProvider };
