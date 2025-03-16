import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  subscribedSymbols: [],
  isConnected: false,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    updateSubscriptions: (state, action) => {
      state.subscribedSymbols = action.payload;
    },
  },
});

export const { addMessage, setConnected, updateSubscriptions } =
  websocketSlice.actions;

export default websocketSlice.reducer;