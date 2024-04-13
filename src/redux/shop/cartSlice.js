import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState:
    JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: {
      reducer(state, action) {
        if (state.find((item) => item === action.payload)) {
          alert("This item already in the cart!");
        } else {
          state.push(action.payload);

          localStorage.setItem(
            "cart",
            JSON.stringify(state),
          );
        }
      },
    },

    removeFromCart(state, action) {
      const index = state.findIndex(
        (item) => item === action.payload,
      );
      state.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const { addToCart, removeFromCart } =
  cartSlice.actions;
