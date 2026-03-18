import { createSlice } from "@reduxjs/toolkit";
import { coupons } from "./Coupons";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    code: "",
    discount: 0,
    applied: false,
    message: "",
  },

  reducers: {
    applyCoupon: (state, action) => {
      const enteredCode = action.payload.toUpperCase();

      if (coupons[enteredCode]) {
        state.code = enteredCode;
        state.discount = coupons[enteredCode];
        state.applied = true;
        state.message = `Coupon "${enteredCode}" applied successfully!`;
      } else {
        state.code = "";
        state.discount = 0;
        state.applied = false;
        state.message = "Invalid Coupon Code ❌";
      }
    },

    removeCoupon: (state) => {
      state.code = "";
      state.discount = 0;
      state.applied = false;
      state.message = "";
    },
  },
});

export const { applyCoupon, removeCoupon } = couponSlice.actions;
export default couponSlice.reducer;