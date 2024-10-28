import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import filmReducer from "./slice/filmSlice"

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    film: filmReducer,
  },
});
