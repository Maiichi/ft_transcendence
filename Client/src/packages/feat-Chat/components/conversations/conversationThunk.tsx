import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";

export const getDirectConversations = createAsyncThunk(
    "conversation/direct",
    async (token: string) => {
        try {
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

export const getDirectConversationMessages = createAsyncThunk(
    "conversation/direct/messages",
    async ({ token, conversationId }: { token: string; conversationId: number }) => {
        try {
            const res = await apiRequest(`/chat/${conversationId}/conversation` , {
                method: "GET",
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            console.log("conversation messages == ", res.data.messages);
            return res.data.messages;
        } catch (error) {
            
        }
    }
)
