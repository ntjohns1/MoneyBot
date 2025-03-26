import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscribe, unsubscribe } from "../service/websocket";

const initialState = {
  messages: [],
  subscribedSymbols: [],
  isConnected: false,
};

export const subscribeForSymbol = createAsyncThunk("websocket/subscribe", async (symbol) => {
  try {
    const response = await subscribe(symbol);
    return response;
  } catch (error) {
    console.error("Error subscribing to symbol:", error);
    throw error;
  }
});

export const unsubscribeForSymbol = createAsyncThunk(
  "websocket/unsubscribe",
  async (symbol) => {
    try {
      const response = await unsubscribe(symbol);
      return response;
    } catch (error) {
      console.error("Error unsubscribing from symbol:", error);
      throw error;
    }
  }
);

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
