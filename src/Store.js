import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./CartSlice";
import couponReducer from "./CouponSlice";
import orderReducer from "./OrderSlice";


const store = configureStore({
  reducer: {
    cart: cartReducers,
    coupon: couponReducer,
    orders : orderReducer
    
  },
});

export default store;