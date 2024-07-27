import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState:
    JSON.parse(localStorage.getItem("cart")) || [],
  reducers: {
    addToCart: {
      reducer(state, action) {
        if (
          !state.find(({ id }) => id === action.payload.id)
        ) {
          state.push(action.payload);
          localStorage.setItem(
            "cart",
            JSON.stringify(state),
          );
        }
      },
    },

    increaseQuantity(state, action) {
      const index = state.findIndex(
        ({ id }) => id === action.payload,
      );

      state[index].quantity += 1;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    decreaseQuantity(state, action) {
      const index = state.findIndex(
        ({ id }) => id === action.payload,
      );

      if (state[index].quantity !== 1) {
        state[index].quantity -= 1;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },

    changeQuantity(state, action) {
      const index = state.findIndex(
        ({ id }) => id === action.payload.id,
      );

      state[index].quantity = action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart(state, action) {
      const index = state.findIndex(
        ({ id }) => id === action.payload,
      );
      state.splice(index, 1);

      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  changeQuantity,
  removeFromCart,
} = cartSlice.actions;
