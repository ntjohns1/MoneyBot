import { createSlice } from "@reduxjs/toolkit";

const lineChartSlice = createSlice({
  name: "lineChart",
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
