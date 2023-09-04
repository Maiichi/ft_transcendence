import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { useAppSelector } from "../../../../core";

export const getDirectConversations = createAsyncThunk(
    "conversation/directMessages",
    async () => {
        // const token = useAppSelector((state) => state.auth.token);
        try {
            const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwNjM1LCJlbWFpbCI6Iml6YWlsQHN0dWRlbnQuMTMzNy5tYSIsImlhdCI6MTY5MzgyNDAwOSwiZXhwIjoxNjkzOTEwNDA5fQ.6M031er_oRs80a88UQp-8YwWla7ZFbnJF9ejzjiqB-w';
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
