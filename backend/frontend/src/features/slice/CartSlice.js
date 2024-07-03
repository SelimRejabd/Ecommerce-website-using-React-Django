import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
  shippingAddress: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  paymentMethod: localStorage.getItem("paymentMethod")
    ? localStorage.getItem("paymentMethod")
    : "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (existingItem) {
        existingItem.qty += newItem.qty;
      } else {
        state.items.push(newItem);
      }
      state.totalPrice += newItem.price * newItem.qty;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
      localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
    },
    removeItem(state, action) {
      const itemIdToRemove = action.payload;
      const itemToRemove = state.items.find(
        (item) => item._id === itemIdToRemove
      );
      if (itemToRemove) {
        state.totalPrice -= itemToRemove.price * itemToRemove.qty;
        state.items = state.items.filter((item) => item._id !== itemIdToRemove);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      }
    },
    updateItemQuantity(state, action) {
      const { itemId, qty } = action.payload;
      const itemToUpdate = state.items.find((item) => item._id === itemId);
      if (itemToUpdate) {
        state.totalPrice -= itemToUpdate.price * itemToUpdate.qty;
        itemToUpdate.qty = qty;
        state.totalPrice += itemToUpdate.price * itemToUpdate.qty;
        localStorage.setItem("cartItems", JSON.stringify(state.items));
        localStorage.setItem("totalPrice", JSON.stringify(state.totalPrice));
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.removeItem("cartItems");
      localStorage.removeItem("totalPrice");
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem("paymentMethod", action.payload);
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
