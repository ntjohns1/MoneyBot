import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getBarsForSymbol } from "../../service/stocks";
import { lastValidDate } from "../../util/dayjsHelper";

export const fetchStockBars = createAsyncThunk(
  "stocks/fetchStockBars",
  async ({ symbol, start, end, timeframe, timeframeUnit }) => {
    if (symbol && symbol != "") {
      const res = await getBarsForSymbol(
        symbol,
        start,
        end,
        timeframe,
        timeframeUnit
      );
      return res;
    }
  }
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    bars: [],
    formState: {
      symbol: "",
      start: lastValidDate().format("YYYY-MM-DD"),
      end: lastValidDate().format("YYYY-MM-DD"),
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
    setTimeframe(state, action) {
      const { start, end, timeframe, timeframeUnit } = action.payload;
      state.formState = {
        ...state.formState,
        start,
        end,
        timeframe,
        timeframeUnit,
      };
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

export const { setFormField, setOpen, setLoading, setTimeframe } =
  stocksSlice.actions;
export default stocksSlice.reducer;
