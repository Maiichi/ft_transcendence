import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";
import { useAppSelector } from "../../../../core";

export const getDirectConversations = createAsyncThunk(
    "conversation/directMessages",
    async () => {
        // const token = useAppSelector((state) => state.auth.token);
        try {
            const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjk5MTg2LCJlbWFpbCI6Im9xYXRpbUBzdHVkZW50LjEzMzcubWEiLCJpYXQiOjE2OTM1ODA3NjAsImV4cCI6MTY5MzY2NzE2MH0.05LShq6mdZ66mXnthokivQMQfKBfo8UPPEYMyUflhqc';
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
