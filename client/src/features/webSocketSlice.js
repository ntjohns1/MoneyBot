import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  data: {}, // Keyed by symbol
  quotes: {}, // Latest quotes by symbol
  bars: {}, // Latest bars by symbol
  trades: {}, // Latest trades by symbol
  error: null,
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
      const symbol = type === 'quote' ? data.Symbol : data.S;
      
      // Store in combined data object
      if (!state.data[symbol]) {
        state.data[symbol] = {};
      }
      state.data[symbol] = {
        ...state.data[symbol],
        [type]: data,
        lastUpdate: new Date().toISOString(),
      };

      // Store in type-specific objects
      switch (type) {
        case 'quote':
          state.quotes[data.Symbol] = {
            bid: data.BidPrice,
            ask: data.AskPrice,
            bidSize: data.BidSize,
            askSize: data.AskSize,
            lastUpdate: new Date().toISOString(),
          };
          break;
        case 'bar':
          state.bars[data.Symbol] = {
            open: data.OpenPrice,
            high: data.HighPrice,
            low: data.LowPrice,
            close: data.ClosePrice,
            volume: data.Volume,
            vwap: data.VWAP,
            timestamp: data.Timestamp,
            lastUpdate: new Date().toISOString(),
          };
          break;
        case 'trade':
          state.trades[data.Symbol] = {
            price: data.Price,
            size: data.Size,
            timestamp: data.Timestamp,
            lastUpdate: new Date().toISOString(),
          };
          break;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setConnected, updateData, clearError, setError } = webSocketSlice.actions;

export default webSocketSlice.reducer;
