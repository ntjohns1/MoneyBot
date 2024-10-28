import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../src/components/AssetsSlice";
import stocksReducer from "../src/components/StocksSlice";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    stocks: stocksReducer,
  },
});

export default store;
