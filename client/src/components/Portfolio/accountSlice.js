import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountInfo, getPortfolioHistory } from "../../service/account";
import dayjs from "dayjs";
import { lastValidDate } from "../../util/dayjsHelper";

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
    console.log("Parameters:", { date_start, date_end, period, timeframe });
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
    accountInfo: null,
    portfolioHistory: {
      timestamps: [],
      equity: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccountInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAccountInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInfo = action.payload; // Store the result
      })
      .addCase(fetchAccountInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchPortfolioHistory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPortfolioHistory.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Portfolio History Payload:", action.payload); // Confirm the structure

        state.portfolioHistory.timestamps = action.payload.timestamp;
        state.portfolioHistory.equity = action.payload.equity;
      })
      .addCase(fetchPortfolioHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setLoading } = accountSlice.actions;
export default accountSlice.reducer;
