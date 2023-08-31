import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { useAppSelector } from "../../../../core";

export const getDirectConversations = createAsyncThunk(
    "conversation/directMessages",
    async () => {
        // const token = useAppSelector((state) => state.auth.token);
        try {
            const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwNjM1LCJlbWFpbCI6Iml6YWlsQHN0dWRlbnQuMTMzNy5tYSIsImlhdCI6MTY5MzQ2NTE3OCwiZXhwIjoxNjkzNTUxNTc4fQ._2gYvAwc2HnbfPEzso1266XzEOUcSoYbMx4EQTIgsR0';
            // console.log("token ===" + token);
            const resp = await apiRequest(`/chat/conversations`, {
                method: 'GET',
                headers : {
                    Authorization: `Bearer ${token}`
                },
            });
            // console.log("RESP ===" + JSON.stringify(resp));
            return resp.data.conversations;
        } catch (error) {
            console.log("error in getDirectConversation", error);
            throw error;
        }
    }
);
