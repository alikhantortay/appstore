import { createSlice } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState:
    JSON.parse(localStorage.getItem("wishlist")) || [],
  reducers: {
    addToWishlist: {
      reducer(state, action) {
        if (state.find((item) => item === action.payload)) {
          Notify.failure(
            "This item already in the wishlist!",
          );
        } else {
          state.push(action.payload);

          localStorage.setItem(
            "wishlist",
            JSON.stringify(state),
          );
        }
      },
    },

    removeFromWishlist(state, action) {
      const index = state.findIndex(
        (item) => item === action.payload,
      );
      state.splice(index, 1);

      localStorage.setItem(
        "wishlist",
        JSON.stringify(state),
      );
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;

export const { addToWishlist, removeFromWishlist } =
  wishlistSlice.actions;
