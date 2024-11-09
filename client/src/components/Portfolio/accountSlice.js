import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountInfo, getPortfolioHistory } from "../../service/account";
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
    portfolioHistory: null,
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
        state.portfolioHistory = action.payload; // Store the result
      })
      .addCase(fetchPortfolioHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setLoading } = accountSlice.actions;
export default accountSlice.reducer;
