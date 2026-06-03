import { createSlice } from "@reduxjs/toolkit";

// Load saved orders from localStorage
const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const OrdersSlice = createSlice({
  name: "orders",
  initialState: savedOrders,

  reducers: {
    addOrder: (state, action) => {
      state.push(action.payload);

      // Save to localStorage
      localStorage.setItem("orders", JSON.stringify(state));
    },

    clearOrders: () => {
      localStorage.removeItem("orders");
      return [];
    },
  },
});

export const { addOrder, clearOrders } = OrdersSlice.actions;
export default OrdersSlice.reducer;