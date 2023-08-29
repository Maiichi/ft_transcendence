import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "../../../../core/utils/apiRequest";




export const getDirectConversation = createAsyncThunk(
    "chat/directMessages",
    async () => {
        try {
            const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjkwNjM1LCJlbWFpbCI6Iml6YWlsQHN0dWRlbnQuMTMzNy5tYSIsImlhdCI6MTY5MzMxNzczOCwiZXhwIjoxNjkzNDA0MTM4fQ.5CyWtlSU9sUHKeZyi0U6TyqTQwkkSuinYnRdLJ2vIVo';
            const resp = await apiRequest(`/chat/conversations`, {
                method: 'GET',
                headers : {
                    Authorization: `Bearer ${token}`
                },
            });
            return resp.data;
        } catch (error) {
            console.log("error in getDirectConversation", error);
            throw error;
        }
    }
);
