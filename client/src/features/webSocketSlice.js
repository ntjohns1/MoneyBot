import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { subscribe, unsubscribe } from "../service/websocket";

const initialState = {
  messages: [],
  subscribedSymbols: [],
  isConnected: false,
  priceData: {}, // Store latest price data for each symbol
};

export const subscribeForSymbol = createAsyncThunk(
  "websocket/subscribe",
  async (symbol) => {
    try {
      const response = await subscribe(symbol);
      return response;
    } catch (error) {
      console.error("Error subscribing to symbol:", error);
      throw error;
    }
  }
);

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
      const message = action.payload;
      state.messages.push(message);

      // Update price data for trades
      if (message.type === "trade") {
        const { S: symbol, p: price, s: size, t: timestamp } = message.data;
        
        if (!state.priceData[symbol]) {
          state.priceData[symbol] = {
            price: 0,
            openPrice: price, // Use first price as open price
            highPrice: price,
            lowPrice: price,
            volume: 0,
            change: 0,
            changePercent: 0,
            lastUpdate: timestamp,
          };
        }

        const data = state.priceData[symbol];
        const oldPrice = data.price;
        
        // Update price data
        data.price = price;
        data.highPrice = Math.max(data.highPrice, price);
        data.lowPrice = Math.min(data.lowPrice, price);
        data.volume += size;
        data.change = price - data.openPrice;
        data.changePercent = ((price - data.openPrice) / data.openPrice) * 100;
        data.lastUpdate = timestamp;

        // Keep messages array from growing too large
        if (state.messages.length > 1000) {
          state.messages = state.messages.slice(-1000);
        }
      }
    },
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    updateSubscriptions: (state, action) => {
      state.subscribedSymbols = action.payload;
    },
    clearSymbolData: (state, action) => {
      const symbol = action.payload;
      delete state.priceData[symbol];
    },
  },
});

export const { addMessage, setConnected, updateSubscriptions, clearSymbolData } =
  websocketSlice.actions;

export default websocketSlice.reducer;
