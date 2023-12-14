import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PaletteMode, Theme, createTheme } from "@mui/material";

const initialTheme: Theme = createTheme({});

const appTheme = createSlice({
  name: "AppTheme",
  initialState: initialTheme,
  reducers: {
    setMode: (state, action: PayloadAction<PaletteMode>) => {
      state.palette.mode = action.payload;
    },
  },
});

export const { setMode } = appTheme.actions;

export default appTheme.reducer;
