import { createSlice } from "@reduxjs/toolkit";

// Load cart from localStorage when app starts
const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

const CartSlice = createSlice({
  name: "cart",
  initialState: savedCart,

  reducers: {
    // Add to Cart
    addToCart: (state, action) => {
      let existingItem = state.find(
        (item) => item.name === action.payload.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        let finalObject = {
          ...action.payload,
          quantity: 1,
        };
        state.push(finalObject);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Increment Quantity
    incrementQty: (state, action) => {
      let item = state.find(
        (item) => item.name === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Decrement Quantity
    decrementQty: (state, action) => {
      let item = state.find(
        (item) => item.name === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // Remove Item
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(
        (item) => item.name !== action.payload
      );

      localStorage.setItem(
        "cart",
        JSON.stringify(updatedCart)
      );

      return updatedCart;
    },

    // Clear Cart
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