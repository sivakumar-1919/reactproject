import { configureStore } from "@reduxjs/toolkit";
import cartReducers from "./CartSlice";
import couponReducer from "./CouponSlice";
import orderReducer from "./OrderSlice";
import filterReducer from "./filterSlice";


const store = configureStore({
  reducer: {
    cart: cartReducers,
    coupon: couponReducer,
    orders : orderReducer,
     filter: filterReducer,
  },
});

export default store;