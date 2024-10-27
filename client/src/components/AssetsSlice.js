import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAsset, getAssets } from "../service/alpaca";

export const fetchAllAssets = createAsyncThunk(
    "assets/fetchAllAssets",
    async () => {
        const res = getAssets();
        return res;
    }
);

export const fetchOneAsset = createAsyncThunk(
    "assets/fetchOneAsset",
    async ({ symbol }) => {
        const res = getAsset();
        return res;
    }
);

const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    allAssets: [],
    asset: null,
    loading: false,
    error: null,
  },
  reducers: {
    setAsset(state, action) {
      state.asset = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAssets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllAssets.fulfilled, (state, action) => {
        state.loading = false;
        state.allAssets = action.payload;
      })
      .addCase(fetchAllAssets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchOneAsset.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOneAsset.fulfilled, (state, action) => {
        state.loading = false;
        state.asset = action.payload;
      })
      .addCase(fetchOneAsset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setAsset, setLoading } = assetsSlice.actions;
export default assetsSlice.reducer;
