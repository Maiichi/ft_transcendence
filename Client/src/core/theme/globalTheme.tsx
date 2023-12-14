import { Theme } from "@emotion/react";
import { createTheme } from "@mui/material";
import { purple, cyan } from "@mui/material/colors";

const initialTheme: Theme = createTheme({
  palette: {
    mode: "light",
    primary: purple,
    secondary: cyan,
  },
});

export { initialTheme };
