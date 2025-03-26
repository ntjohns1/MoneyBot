import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllWatchlists } from "../../service/watchlist";

export const fetchAllWatchlists = createAsyncThunk(
  "watchlist/fetchAllWatchlists",
  async () => {
    const res = await getAllWatchlists();
    return res;
  }
);  

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlists: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllWatchlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWatchlists.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlists = action.payload;
      })
      .addCase(fetchAllWatchlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default watchlistSlice.reducer;

export const { } = watchlistSlice.actions;  