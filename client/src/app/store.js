import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../components/AssetsSlice";
import stocksReducer from "../components/StocksSlice";

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    stocks: stocksReducer,
  },
});

export default store;
