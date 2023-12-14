import { ThemeProvider } from "@mui/material";
import { theme } from "./AppColors";


interface App {
  children: JSX.Element;
}

const AppThemeProvider = (props: App) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default AppThemeProvider;
export { AppThemeProvider };
