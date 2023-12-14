import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaletteMode, Theme } from "@mui/material";
import { initialTheme } from "./globalTheme";

const appTheme = createSlice({
  name: "AppTheme",
  initialState: initialTheme as Theme,
  reducers: {
    setMode: (state, action: PayloadAction<PaletteMode>) => {
      state.palette.mode = action.payload;
    },
  },
});

export const { setMode } = appTheme.actions;

export default appTheme.reducer;
