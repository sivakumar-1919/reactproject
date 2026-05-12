import { createSlice } from "@reduxjs/toolkit";

const OrdersSlice = createSlice({
  name: "orders",
  initialState: [],

  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);
    },

    clearOrders: () => {
      return [];
    },
  },
});

export const { addOrder, clearOrders } = OrdersSlice.actions;
export default OrdersSlice.reducer;