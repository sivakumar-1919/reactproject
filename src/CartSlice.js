import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartSlice = createSlice({
  name: "cart",
  initialState: savedCart,

  reducers: {

    // ADD TO CART
    addToCart: (state, action) => {

      let existingItem = state.find(
        (item) => item.id === action.payload.id   // ✅ FIX
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({
          ...action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // INCREMENT
    incrementQty: (state, action) => {

      let item = state.find(
        (item) => item.id === action.payload   // ✅ FIX
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // DECREMENT
    decrementQty: (state, action) => {

      let item = state.find(
        (item) => item.id === action.payload   // ✅ FIX
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // REMOVE ITEM
    removeFromCart: (state, action) => {

      const updatedCart = state.filter(
        (item) => item.id !== action.payload   // ✅ FIX
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },

    // CLEAR CART
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;