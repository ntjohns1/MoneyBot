import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostions } from "../../service/positions";

export const fetchAllPositions = createAsyncThunk(
  "positions/getAllPositions",
  async () => {
    const res = await getAllPostions();
    return res;
  }
);

const positionsSlice = createSlice({
  name: "positions",
  initialState: {
    allPositions: [],
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
      .addCase(fetchAllPositions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPositions.fulfilled, (state, action) => {
        state.loading = false;
        state.allPositions = action.payload;
      })
      .addCase(fetchAllPositions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setLoading } = positionsSlice.actions;
export default positionsSlice.reducer;
