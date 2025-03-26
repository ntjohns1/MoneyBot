import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllWatchlists,
  getWatchlistById,
  createWatchlist,
  addSymbolToWatchlist,
  updateWatchlist,
  deleteWatchlist,
  removeSymbolFromWatchlist,
} from "../../service/watchlist";

// Async thunks for watchlist operations
export const fetchAllWatchlists = createAsyncThunk(
  "watchlist/fetchAllWatchlists",
  async () => {
    const res = await getAllWatchlists();
    console.log("fetchAllWatchlists", res);
    return res;
  }
);

export const fetchWatchlistById = createAsyncThunk(
  "watchlist/fetchWatchlistById",
  async (id) => {
    const res = await getWatchlistById(id);
    console.log("fetchWatchlistById", res);
    return res;
  }
);

export const createNewWatchlist = createAsyncThunk(
  "watchlist/createWatchlist",
  async ({ name, symbols }) => {
    const res = await createWatchlist(name, symbols);
    return res;
  }
);

export const addSymbol = createAsyncThunk(
  "watchlist/addSymbol",
  async ({ id, symbol }, { rejectWithValue }) => {
    try {
      const res = await addSymbolToWatchlist(id, symbol);
      return res;
    } catch (error) {
      // Handle server error responses
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      throw error;
    }
  }
);

export const updateWatchlistSymbols = createAsyncThunk(
  "watchlist/updateSymbols",
  async ({ id, symbols }) => {
    const res = await updateWatchlist(id, symbols);
    return res;
  }
);

export const removeWatchlist = createAsyncThunk(
  "watchlist/deleteWatchlist",
  async (id) => {
    await deleteWatchlist(id);
    return id;
  }
);

export const removeSymbol = createAsyncThunk(
  "watchlist/removeSymbol",
  async ({ id, symbol }) => {
    const res = await removeSymbolFromWatchlist(id, symbol);
    return res;
  }
);

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlists: [],
    selectedWatchlist: null,
    loading: false,
    error: null,
  },
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
      // Fetch all watchlists
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
      })
      // Fetch single watchlist
      .addCase(fetchWatchlistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlistById.fulfilled, (state, action) => {
        state.loading = false;
        // Update both the watchlist in the list and the selected watchlist
        const index = state.watchlists.findIndex(w => w.id === action.payload.id);
        if (index !== -1) {
          state.watchlists[index] = {
            ...state.watchlists[index],
            ...action.payload
          };
        }
        if (state.selectedWatchlist?.id === action.payload.id) {
          state.selectedWatchlist = {
            ...state.selectedWatchlist,
            ...action.payload
          };
        }
      })
      .addCase(fetchWatchlistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Create watchlist
      .addCase(createNewWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNewWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlists.push(action.payload);
      })
      .addCase(createNewWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Add symbol to watchlist
      .addCase(addSymbol.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addSymbol.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.watchlists.findIndex((w) => w.id === action.payload.id);
        if (index !== -1) {
          state.watchlists[index] = action.payload;
        }
        if (state.selectedWatchlist?.id === action.payload.id) {
          state.selectedWatchlist = action.payload;
        }
      })
      .addCase(addSymbol.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update watchlist
      .addCase(updateWatchlistSymbols.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWatchlistSymbols.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.watchlists.findIndex((w) => w.id === action.payload.id);
        if (index !== -1) {
          state.watchlists[index] = action.payload;
        }
        if (state.selectedWatchlist?.id === action.payload.id) {
          state.selectedWatchlist = action.payload;
        }
      })
      .addCase(updateWatchlistSymbols.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Delete watchlist
      .addCase(removeWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlists = state.watchlists.filter((w) => w.id !== action.payload);
        if (state.selectedWatchlist?.id === action.payload) {
          state.selectedWatchlist = null;
        }
      })
      .addCase(removeWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Remove symbol from watchlist
      .addCase(removeSymbol.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeSymbol.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.watchlists.findIndex((w) => w.id === action.payload.id);
        if (index !== -1) {
          state.watchlists[index] = action.payload;
        }
        if (state.selectedWatchlist?.id === action.payload.id) {
          state.selectedWatchlist = action.payload;
        }
      })
      .addCase(removeSymbol.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedWatchlist, clearError } = watchlistSlice.actions;
export default watchlistSlice.reducer;