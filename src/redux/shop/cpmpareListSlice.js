import { createSlice } from "@reduxjs/toolkit";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const compareSlice = createSlice({
  name: "compare",
  initialState:
    JSON.parse(localStorage.getItem("compare")) || [],
  reducers: {
    addToCompare: {
      reducer(state, action) {
        if (state.find((item) => item === action.payload)) {
          Notify.failure(
            "This item already in your compare list!",
          );
        } else if (state.length === 3) {
          Notify.failure(
            "Compare list can't include more then 3 items!",
          );
        } else {
          state.push(action.payload);

          localStorage.setItem(
            "compare",
            JSON.stringify(state),
          );
        }
      },
    },

    removeFromCompare(state, action) {
      const index = state.findIndex(
        (item) => item === action.payload,
      );
      state.splice(index, 1);

      localStorage.setItem(
        "compare",
        JSON.stringify(state),
      );
    },
  },
});

export const compareReducer = compareSlice.reducer;

export const { addToCompare, removeFromCompare } =
  compareSlice.actions;
