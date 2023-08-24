import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt, { JwtPayload } from "jwt-decode"; // import dependency
import { apiRequest } from "../../../core/utils/apiRequest";

type LoginPayload = {
    token: string;
    firstLogin: boolean;
    user?: object;
};

export const login = createAsyncThunk<LoginPayload, LoginPayload>(
    "auth/login",
    async (payload) => {
        try {
            const jwtPaylaod = jwt<JwtPayload>(payload.token);
            const resp = await apiRequest(`/users/byid/${jwtPaylaod.sub}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${payload.token}`,
                },
            });

            console.log("RESP", resp);
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