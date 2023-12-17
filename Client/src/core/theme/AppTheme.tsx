import { ReactNode, useEffect } from "react";
import {
  CssBaseline,
  PaletteMode,
  Theme,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux";
import { swapMode } from "./themeSlice";

interface App {
  children: ReactNode;
}

const AppThemeProvider = (props: App) => {
  const themeState: Theme = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    !themeState && dispatch(swapMode());
  }, [themeState]);

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
