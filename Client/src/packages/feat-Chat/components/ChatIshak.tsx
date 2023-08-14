import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ChatIshakState {
    name: string,
    from: string
    isRead: boolean,
    msg: string
}

const initialState: ChatIshakState = {
    name: "",
    from: "",
    isRead: false,
    msg: ""
}

export const chatIshakSlice = createSlice({
    name: "chat",
    initialState,
    reducers : {
        sendMessage: (state, action: PayloadAction<{name: string, msg: string}>) => {
            state.name = action.payload.name;
            state.isRead = true;
            state.msg = action.payload.msg;
        },
        clearState : (state) => {
            state.name = "";
            state.isRead = false;
            state.msg = ""
        }
    }
});

export const { sendMessage, clearState } = chatIshakSlice.actions;

// const chatIshakReducer = chatIshakSlice.reducer;
// export default chatIshakReducer;
export default chatIshakSlice.reducer;