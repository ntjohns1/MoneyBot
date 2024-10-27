import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBarsForSymbol } from "../service/alpaca";
import dayjs from "dayjs";

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const fetchStockBars = createAsyncThunk(
  "stocks/fetchStockBars",
  async ({ symbol, start, end, timeframe, timeframeUnit }) => {
    const res = await getBarsForSymbol(symbol, start, end, timeframe, timeframeUnit);
    return res;
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    bars: [],
    formState: {
      symbol: "",
      start: yesterday.toJSON().slice(0, 10),
      end: today.toJSON().slice(0, 10),
      timeframe: 1,
      timeframeUnit: "MIN",
    },
    open: false,
    loading: false,
    error: null,
  },
  reducers: {
    setFormField(state, action) {
      const { field, value } = action.payload;
      state.formState[field] = value;
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
        console.log("Payload received in reducer:", action.payload); 
        state.bars = [...action.payload];
      })
      .addCase(fetchStockBars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setFormField, setOpen, setLoading } = stocksSlice.actions;
export default stocksSlice.reducer;
