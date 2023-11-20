import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../core";
import { useEffect } from "react";

const AsyncFunction = async (get: string, ms: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(get);
    }, ms);
  });
};

const asyncThunk1 = createAsyncThunk("sliceName/asyncThunk1", async () => {
  return await AsyncFunction("asyncThunk1", 1000);
});

const asyncThunk2 = createAsyncThunk("sliceName/asyncThunk2", async () => {
  return await AsyncFunction("asyncThunk2", 10000);
});

const combinedAsyncThunk = createAsyncThunk(
  "sliceName/combinedAsyncThunk",
  async (_, { dispatch }) => {
    try {
      const result1 = await dispatch(asyncThunk1());
      const result2 = await dispatch(asyncThunk2());
      const result = { r1:result1.payload, r2:result2.payload }
      return result
    } catch (error) {
      throw error;
    }
  }
);

const slice = createSlice({
  name: "sliceName",
  initialState: { err: "hoooooooooooo" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(combinedAsyncThunk.pending, (state) => {
        console.log("pending");
      })
      .addCase(combinedAsyncThunk.rejected, (state) => {
        console.log("rejection");
      })
      .addCase(combinedAsyncThunk.fulfilled, (state, action) => {
        console.log(action.payload);
      });
  },
});

export default slice.reducer;

export const Test = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(combinedAsyncThunk());
  }, []);
  return <>hi, this is a test </>;
};
