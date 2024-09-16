import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchIPInfo = createAsyncThunk("fetchIPInfo", async () => {
  const res = await fetch("https://ipapi.co/json/");

  const result = await res.json();

  console.log(result);

  return result;
});

const initialState = {
  isLoading: false,
  data: {},
  isError: false,
};

const IPInfoSlice = createSlice({
  name: "IPInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIPInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIPInfo.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchIPInfo.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default IPInfoSlice.reducer;
