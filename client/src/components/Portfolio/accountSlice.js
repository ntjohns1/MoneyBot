import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountInfo, getPortfolioHistory } from "../../service/account";

export const fetchAccountInfo = createAsyncThunk(
  "account/getAccountInfo",
  async () => {
    const res = await getAccountInfo();
    return res;
  }
);

export const fetchPortfolioHistory = createAsyncThunk(
  "account/getPortfolioHistory",
  async ({ date_start, date_end, period, timeframe }) => {
    const res = await getPortfolioHistory(
      date_start,
      date_end,
      period,
      timeframe
    );
    return res;
  }
);

const accountSlice = createSlice({
  name: "account",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = accountSlice.actions;
export default accountSlice.reducer;
