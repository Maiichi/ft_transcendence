import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface FilterState {
    isLoading: boolean;
    searchQuery: string
}

const initialState: FilterState = {
    searchQuery: '',
    isLoading: false,
};

export const FilterSlice = createSlice({
    name: "filter",
    initialState,
    reducers : {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        clearSearchQuery: (state) => {
            state.searchQuery = '';
        },
    },
   
});

export const { setSearchQuery, clearSearchQuery } = FilterSlice.actions;

export default FilterSlice.reducer;