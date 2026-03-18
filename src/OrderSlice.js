import { createSlice } from "@reduxjs/toolkit";

const OrdersSlice = createSlice({
  name: "orders",
  initialState: [],   // stores all placed orders

  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload); // add new order
    },
  },
});

export const { addOrder } = OrdersSlice.actions;
export default OrdersSlice.reducer;