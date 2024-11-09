import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../components/AssetsSlice";
import stocksReducer from "../components/Stocks/StocksSlice";
import stockHistoryChartReducer from "../components/Stocks/stockHistoryChartSlice";
import accountReducer from "../components/Portfolio/accountSlice"

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    stocks: stocksReducer,
    lineChart: stockHistoryChartReducer,
    account: accountReducer,
  },
});

export default store;
