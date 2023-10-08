import { createSlice } from "@reduxjs/toolkit"
import { getLeaderboard } from "./LeaderBoardThunk"

export interface leaderboardSlice {
    leaderboard:  any | null,
    isLoading: boolean
}

const initialState: leaderboardSlice = {
    leaderboard: null,
    isLoading: true
}

const leaderboardSlice = createSlice({
    name: "leaderboard",
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
        .addCase(getLeaderboard.pending, state => {
            state.isLoading = true
        })
        .addCase(getLeaderboard.fulfilled, (state, action) => {
            state.leaderboard = action.payload
            state.isLoading = false
        })
        .addCase(getLeaderboard.rejected, state => {
            state.isLoading = false
        })
    }
})

export const {  } = leaderboardSlice.actions
/** in rootReducer = combineReducers as LeaderBoard */
export default leaderboardSlice.reducer