import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "../components/AssetsSlice";
import stocksReducer from "../components/Stocks/StocksSlice";
import stockHistoryChartReducer from "../components/Stocks/stockHistoryChartSlice";
import accountReducer from "../components/Portfolio/accountSlice";
import positionsReducer from "../components/Positions/positionsSlice";
import ordersReducer from "../components/Orders/ordersSlice"

export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    stocks: stocksReducer,
    lineChart: stockHistoryChartReducer,
    account: accountReducer,
    positions: positionsReducer,
    orders: ordersReducer,
  },
});

export default store;
