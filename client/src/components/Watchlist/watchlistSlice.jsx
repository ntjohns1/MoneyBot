import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllWatchlists,
  getWatchlistById,
  createWatchlist as createWatchlistApi,
  addSymbolToWatchlist,
  removeSymbolFromWatchlist,
  deleteWatchlist as deleteWatchlistApi,
} from "../../service/watchlist";

// Async thunks
export const fetchAllWatchlists = createAsyncThunk(
  "watchlist/fetchAll",
  async () => {
    try {
      return await getAllWatchlists();
    } catch (error) {
      throw error;
    }
  }
);

export const fetchWatchlistById = createAsyncThunk(
  "watchlist/fetchById",
  async (id) => {
    try {
      const res = await getWatchlistById(id);
      console.log(res);
      return res;
    } catch (error) {
      throw error;
    }
  }
);

export const createWatchlist = createAsyncThunk(
  "watchlist/create",
  async ({ name, symbols = [] }) => {
    try {
      return await createWatchlistApi(name, symbols);
    } catch (error) {
      throw error;
    }
  }
);

export const addSymbol = createAsyncThunk(
  "watchlist/addSymbol",
  async ({ id, symbol }) => {
    try {
      return await addSymbolToWatchlist(id, symbol);
    } catch (error) {
      throw error;
    }
  }
);

export const removeSymbol = createAsyncThunk(
  "watchlist/removeSymbol",
  async ({ id, symbol }) => {
    try {
      const updatedWatchlist = await removeSymbolFromWatchlist(id, symbol);
      return { id, symbol, updatedWatchlist };
    } catch (error) {
      throw error;
    }
  }
);

export const deleteWatchlist = createAsyncThunk(
  "watchlist/delete",
  async (id) => {
    try {
      await deleteWatchlistApi(id);
      return id;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  watchlists: [],
  selectedWatchlist: null,
  loading: false,
  error: null,
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setSelectedWatchlist: (state, action) => {
      state.selectedWatchlist = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Watchlists
      .addCase(fetchAllWatchlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWatchlists.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlists = Array.isArray(action.payload) ? action.payload : [];
        // Select first watchlist if none selected
        if (!state.selectedWatchlist && action.payload?.length > 0) {
          state.selectedWatchlist = action.payload[0];
        }
      })
      .addCase(fetchAllWatchlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.watchlists = []; // Reset to empty array on error
      })

      // Fetch Single Watchlist
      .addCase(fetchWatchlistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlistById.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.id) {
          // Update both the watchlists array and selectedWatchlist
          const index = state.watchlists.findIndex(w => w.id === action.payload.id);
          if (index !== -1) {
            state.watchlists[index] = action.payload;
          }
          if (state.selectedWatchlist?.id === action.payload.id) {
            state.selectedWatchlist = action.payload;
          }
        }
      })
      .addCase(fetchWatchlistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Watchlist
      .addCase(createWatchlist.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          state.watchlists.push(action.payload);
          state.selectedWatchlist = action.payload;
        }
      })

      // Add Symbol
      .addCase(addSymbol.fulfilled, (state, action) => {
        if (action.payload && action.payload.id) {
          const index = state.watchlists.findIndex(w => w.id === action.payload.id);
          if (index !== -1) {
            state.watchlists[index] = { ...state.watchlists[index], ...action.payload };
            if (state.selectedWatchlist?.id === action.payload.id) {
              state.selectedWatchlist = { ...state.selectedWatchlist, ...action.payload };
            }
          }
        }
      })

      // Remove Symbol
      .addCase(removeSymbol.fulfilled, (state, action) => {
        if (action.payload.updatedWatchlist && action.payload.id) {
          const index = state.watchlists.findIndex(w => w.id === action.payload.id);
          if (index !== -1) {
            state.watchlists[index] = { ...state.watchlists[index], ...action.payload.updatedWatchlist };
            if (state.selectedWatchlist?.id === action.payload.id) {
              state.selectedWatchlist = { ...state.selectedWatchlist, ...action.payload.updatedWatchlist };
            }
          }
        }
      })

      // Delete Watchlist
      .addCase(deleteWatchlist.fulfilled, (state, action) => {
        if (action.payload) {
          state.watchlists = state.watchlists.filter(w => w.id !== action.payload);
          if (state.selectedWatchlist?.id === action.payload) {
            state.selectedWatchlist = state.watchlists[0] || null;
          }
        }
      });
  },
});

export const { setSelectedWatchlist, clearError } = watchlistSlice.actions;

export default watchlistSlice.reducer;