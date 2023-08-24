import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authThunk";

const initialState = {
    token: null as string | null,
    firstLogin: false,
    user: {} as object | undefined,
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
                state.loading = false;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { setToken, setFirstLogin } = authSlice.actions;

export default authSlice.reducer;
