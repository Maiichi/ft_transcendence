import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaletteMode, Theme } from "@mui/material";
import { initialTheme } from "./globalTheme";

const appTheme = createSlice({
  name: "AppTheme",
  initialState: initialTheme as Theme,
  reducers: {
    swapMode: (state) => {
      state.palette.mode = state.palette.mode != "dark" ? "dark" : "light";
    },
  },
});

export const { swapMode } = appTheme.actions;

export default appTheme.reducer;
