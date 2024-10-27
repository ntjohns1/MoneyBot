import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBarsForSymbol } from "../service/alpaca";

export const fetchStockBars = createAsyncThunk(
  "stocks/fetchStockBars",
  async ({ symbol }) => {
    const res = await getBarsForSymbol(symbol);
    return res;
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    bars: [],
    symbol: null,
    barStart: null,
    barEnd: null,
    inputValue: '',
    open: false,
    loading: false,
    error: null,
  },
  reducers: {
    setSymbol(state, action) {
      state.symbol = action.payload;
    },
    setBarStart(state, action) {
      state.barStart = action.payload;
    },
    setBarEnd(state, action) {
      state.barEnd = action.payload;
    },
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
    setOpen(state, action) {
      state.open = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockBars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStockBars.fulfilled, (state, action) => {
        state.loading = false;
        state.bars = action.payload;
      })
      .addCase(fetchStockBars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const {
  setSymbol,
  setBarStart,
  setBarEnd,
  setInputValue,
  setOpen,
  setLoading,
} = stocksSlice.actions;
export default stocksSlice.reducer;
