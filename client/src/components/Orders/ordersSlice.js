import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getOrders, createOrder } from "../../service/orders";

export const fetchAllOrders = createAsyncThunk("orders/getOrders", async () => {
  const res = await getOrders();
  return res;
});

export const newOrder = createAsyncThunk(
  "orders/createOrder",
  async ({ orderData }) => {
    const res = await createOrder(orderData);
    return res;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    formState: {
      // required
      symbol: "", // string
      qty: "", // number
      notional: "", // number
      side: "buy", // 'buy' | 'sell'
      type: "market", // 'market' | 'limit' | 'stop' | 'stop_limit' | 'trailing_stop'
      time_in_force: "day", // 'day' | 'gtc' | 'opg' | 'ioc'
      // optional
      limit_price: "", // number
      stop_price: "", // number
      client_order_id: "", // string
      extended_hours: false, // boolean
      order_class: "", // simple (or ""), 'oco', 'oto', 'bracket'
      take_profit: {}, // object
      stop_loss: {}, // object
      trail_price: "", // string
      trail_percent: "", // string
    },
    allOrders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFormField(state, action) {
      const { field, value } = action.payload;
      state.formState[field] = value;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setFormField, setLoading } = ordersSlice.actions;
export default ordersSlice.reducer;
