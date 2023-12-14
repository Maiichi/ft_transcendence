import { Theme } from "@emotion/react";
import { createTheme, responsiveFontSizes } from "@mui/material";
import { purple, teal } from "@mui/material/colors";

const initialTheme: Theme = responsiveFontSizes(
  createTheme({
    palette: {
      common: {
        white: purple[50],
        black: "#101d1d",
      },
      primary: purple,
      secondary: {
        main: "#00695c",
      },
    },
  })
);

export { initialTheme };
