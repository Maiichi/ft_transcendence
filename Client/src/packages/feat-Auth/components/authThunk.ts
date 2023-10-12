import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt, { JwtPayload } from "jwt-decode"; // import dependency

import { apiRequest } from "../../../core/utils/apiRequest";
import { User } from "./authSlice";

type LoginPayload = {
    token: string;
    firstLogin: boolean;
    user: User | null;
};

type UserNameUpdatePayload = {
    isFirstTime?: boolean;
    token: string;
    id: number;
    user: User | null;
    newUsername: string;
};

export const login = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload) => {
        try {
            const jwtPaylaod = jwt<JwtPayload>(payload.token);
            const resp = await apiRequest(`/users/byid/${jwtPaylaod.sub}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            });

            // console.log("RESP", resp);
            // payload.user = user;
            payload.user = resp?.message || {};
            // Return the decrypted token as the result of the thunk
            return payload;
        } catch (error) {
            console.error("Token decryption failed:", error);
            throw error; // Propagate the error to be handled by .rejected case
        }
    }
);

export const updateUserName = createAsyncThunk(
    "auth/updateUserName",
    async (payload: UserNameUpdatePayload) => {
        try {
            const resp = await apiRequest(`/users/${payload.id}/update`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
                data: { userName: payload.newUsername },
            });

            payload.user = resp.data;

            return payload;
        } catch (error) {
            console.error("User update failed:", error);
            throw error; // Propagate the error to be handled by .rejected case
        }
    }
);

export const enableTwoFactor = createAsyncThunk(
    "auth/enableTwoFactor",
    async (payload: { token: string }) => {
        try {
            await apiRequest(`/auth/2fa/enable`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            });

            // Return the decrypted token as the result of the thunk
            return payload;
        } catch (error) {
            console.error("User update failed:", error);
            throw error; // Propagate the error to be handled by .rejected case
        }
    }
);

export const disableTwoFactor = createAsyncThunk(
    "auth/disableTwoFactor",
    async (payload: { token: string }) => {
        try {
            await apiRequest(`/auth/2fa/disable`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            });

            // Return the decrypted token as the result of the thunk
            return payload;
        } catch (error) {
            console.error("User update failed:", error);
            throw error; // Propagate the error to be handled by .rejected case
        }
    }
);

export const uploadAvatar = createAsyncThunk(
    "auth/uploadAvatar",
    async (payload: {
        id: number;
        token: string;
        formData: FormData;
        picture: string;
    }) => {
        try {
            const resp = await apiRequest(
                `/users/${payload.id}/upload-avatar`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${payload.token}`,
                    },
                    data: payload.formData,
                }
            );

            payload.picture = resp.data.avatar_url;

            return payload.picture;
        } catch (error) {
            console.error("Avatar update failed:", error);
            throw error; // Propagate the error to be handled by .rejected case
        }
    }
);
