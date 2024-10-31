import { createSlice } from "@reduxjs/toolkit";

const stockHistoryChartSlice = createSlice({
  name: "stockHistoryChart",
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



export const { setLoading } = stockHistoryChartSlice.actions;
export default stockHistoryChartSlice.reducer;