import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import filmReducer from "./slice/filmSlice"
import qrReducer from  "./slice/qrSlice";
import authReducer from "./slice/authSlice";
import hoadonReducer from "./slice/hoadonSlice";
import ticketReducer from "./slice/ticket";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    film: filmReducer,
    qr: qrReducer,
    auth: authReducer,
    hoadon: hoadonReducer,
    ticket: ticketReducer,
  },
});
