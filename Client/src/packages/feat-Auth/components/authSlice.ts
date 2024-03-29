import {
  disableTwoFactor,
  enableTwoFactor,
  login,
  updateUserName,
  uploadAvatar,
} from "./authThunk";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
export type User = {
  id: number;
  intraId: number;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  avatar_url: string | null;
  status: string;
  twoFactorActivate: boolean;
  twoFactorSecret: string | null;
  createdAt: string;
  updatedAt: string;
};

// Define the shape of the user state
export interface AuthState {
  token: string | null;
  user: User | null;
  firstLogin: boolean;
  loading: boolean;
  shouldVerifyTwoFactor?: boolean;
  error?: string | null;
}

const initialState: AuthState = {
  shouldVerifyTwoFactor: false,
  token: null,
  firstLogin: false,
  user: null,
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFirstLogin: (state, action) => {
      state.firstLogin = action.payload;
    },
    setShouldVerifyTwoFactor: (state, action) => {
      state.shouldVerifyTwoFactor = action.payload;
    },
    userLogout: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.firstLogin = action.payload.firstLogin;
        state.user = action.payload.user;
        state.shouldVerifyTwoFactor = state.user?.twoFactorActivate;
        state.loading = false;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateUserName.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        if (action.payload?.isFirstTime) state.firstLogin = false;
        if (state.user) {
          state.user.userName = action.payload.newUsername;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        if (state.user) state.user.avatar_url = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state) => {
        state.loading = false;
      })
      .addCase(enableTwoFactor.pending, (state) => {
        state.loading = true;
      })
      .addCase(enableTwoFactor.fulfilled, (state, action) => {
        if (state.user) state.user.twoFactorActivate = true;
        state.loading = false;
      })
      .addCase(enableTwoFactor.rejected, (state) => {
        state.loading = false;
      })
      .addCase(disableTwoFactor.pending, (state) => {
        state.loading = true;
      })
      .addCase(disableTwoFactor.fulfilled, (state, action) => {
        if (state.user) state.user.twoFactorActivate = false;
        state.loading = false;
      })
      .addCase(disableTwoFactor.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setToken, setFirstLogin, setShouldVerifyTwoFactor, userLogout } =
  authSlice.actions;

export default authSlice.reducer;
