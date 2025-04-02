import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  data: {},
};

const webSocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    updateData: (state, action) => {
      const { type, data } = action.payload;
      if (!data?.symbol) return;

      console.log(`📝 Updating ${type} data for ${data.symbol}:`, data);
      
      // Initialize symbol data if it doesn't exist
      state.data[data.symbol] = state.data[data.symbol] || {};
      
      if (type === 'quote') {
        state.data[data.symbol].price = data.price || data.p;
      } else if (type === 'bar') {
        state.data[data.symbol].bar = {
          open: data.open || data.o,
          high: data.high || data.h,
          low: data.low || data.l,
          close: data.close || data.c,
          volume: data.volume || data.v,
        };
      }
    },
  },
});

export const { setConnected, updateData } = webSocketSlice.actions;
export default webSocketSlice.reducer;
