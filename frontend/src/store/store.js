import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/user.slice";
import { cartSlice } from "./slices/cart.slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    cart: cartSlice.reducer,
  },
});

export default store;
