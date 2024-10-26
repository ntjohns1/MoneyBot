import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const stocksSlice = createSlice({
  name: "students",
  initialState: {
    stocks: [],
    selectedStock: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = stocksSlice.actions;
export default stocksSlice.reducer;
