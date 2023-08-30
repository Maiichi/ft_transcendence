import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";

export const getDirectConversations = createAsyncThunk(
    "conversation/directMessages",
    async () => {
        try {
            const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwNjM1LCJlbWFpbCI6Iml6YWlsQHN0dWRlbnQuMTMzNy5tYSIsImlhdCI6MTY5MzM0MDEzNywiZXhwIjoxNjkzNDI2NTM3fQ.KRZDcysAOZD4Xc7qd8Hd1pBwKFcVhJI6a4aS_X5a-V4';
            const resp = await apiRequest(`/chat/conversations`, {
                method: 'GET',
                headers : {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("RESP ===" + JSON.stringify(resp));
            return resp.data.conversations;
        } catch (error) {
            console.log("error in getDirectConversation", error);
            throw error;
        }
    }
);
