import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: [],
   reducers: {
    addToCart: (state, action) => {
      let existingItem=state.find(item=>item.name===action.payload.name)
      if (existingItem) {
        existingItem.quantity+=1;
         } else {
        let finalObject={...action.payload,quantity:1}
        state.push(finalObject);
      }
    },

     // ✅ INCREMENT QUANTITY
    incrementQty: (state, action) => {
      let item = state.find(item => item.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    // ✅ DECREMENT QUANTITY
    decrementQty: (state, action) => {
      let item = state.find(item => item.name === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // ✅ NEW REMOVE REDUCER
    removeFromCart: (state, action) => {
      return state.filter(item => item.name !== action.payload);
    },

     clearCart: () => {
      return [];
    }

}  
});

export const { addToCart,removeFromCart, incrementQty, decrementQty,clearCart } = CartSlice.actions;
export default CartSlice.reducer;

