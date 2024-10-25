import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartslice.js";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
