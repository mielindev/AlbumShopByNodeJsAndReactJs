import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartItemsLocal = JSON.parse(localStorage.getItem("cartItems")) || [];

const initialState = {
  cartItems: cartItemsLocal,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addtoCart: (state, { payload }) => {
      const isExistingItem = state.cartItems.find(
        (item) =>
          item.id === payload.id &&
          item.format_details.format.id === payload.format_details.format.id
      );
      if (isExistingItem) {
        isExistingItem.quantity += payload.quantity;
      } else {
        state.cartItems.push(payload);
      }
      toast.success("Đã thêm sản phẩm vào giỏ hàng");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeItem: (state, { payload }) => {
      const updatedCartItems = state.cartItems.filter((item) => {
        return (
          item.id !== payload.id ||
          item.format_details?.format?.id !== payload.format_details?.format?.id
        );
      });
      state.cartItems = updatedCartItems;
      toast.success("Xoá sản phẩm thành công");
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addtoCart, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
