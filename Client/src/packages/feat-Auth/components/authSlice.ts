import { createSlice } from "@reduxjs/toolkit";
import {
    disableTwoFactor,
    enableTwoFactor,
    login,
    updateUserName,
} from "./authThunk";

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
interface AuthState {
    token: string | null;
    user: User | null;
    firstLogin: boolean;
    loading: boolean;
    shouldVerifyTwoFactor?: boolean;
}

const initialState: AuthState = {
    shouldVerifyTwoFactor: false,
    token: null,
    firstLogin: false,
    user: null,
    loading: false,
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
                    console.log("jojo", action.payload.newUsername);
                    state.user.userName = action.payload.newUsername;
                }
                state.loading = false;
            })
            .addCase(updateUserName.rejected, (state) => {
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

export const { setToken, setFirstLogin, setShouldVerifyTwoFactor } =
    authSlice.actions;

export default authSlice.reducer;
