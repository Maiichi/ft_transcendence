import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../core";
import { apiRequest } from "../../core/utils/apiRequest";


export const getUserFriends = createAsyncThunk(
    "friends",
    async (_, {getState}) => {
        try {
            const token = (getState() as RootState).auth.token;
            const response = await apiRequest(`/users/friends`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('friends ==', JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            console.log("error in friendsThunk", error);
            throw error;
        }
    }
)