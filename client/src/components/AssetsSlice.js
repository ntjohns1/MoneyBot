import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const assetsSlice = createSlice({
  name: "students",
  initialState: {
    assets: [],
    selectedAsset: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = assetsSlice.actions;
export default assetsSlice.reducer;
