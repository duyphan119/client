import { createSlice } from "@reduxjs/toolkit";
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: JSON.parse(localStorage.getItem("_cart_")) || { items: [] },
  },
  reducers: {
    setCart: (state, action) => {
      state.cart = action.payload ? action.payload : { items: [] };
      localStorage.setItem(
        "_cart_",
        JSON.stringify(state.cart || { items: [] })
      );
    },
    addToCart: (state, action) => {
      if (!state.cart) {
        state.cart = {
          items: [],
        };
      }
      const index = state.cart.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.cart.items = [action.payload, ...state.cart.items];
      } else {
        state.cart.items[index].quantity += action.payload.quantity;
      }

      localStorage.setItem("_cart_", JSON.stringify(state.cart));
    },
    updateCartItem: (state, action) => {
      const index = state.cart.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.cart.items[index].quantity = action.payload.quantity;
      }
      localStorage.setItem("_cart_", JSON.stringify(state.cart));
    },
    deleteCartItem: (state, action) => {
      state.cart.items = state.cart.items.filter(
        (item) => item.id !== action.payload
      );
      localStorage.setItem("_cart_", JSON.stringify(state.cart));
    },
  },
});
export const cartSelector = (state) => state.cart;
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
