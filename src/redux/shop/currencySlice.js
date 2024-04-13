import { createSlice } from "@reduxjs/toolkit";

const currencySlice = createSlice({
  name: "currency",
  initialState: {
    current: localStorage.getItem("currency") || "USD",
  },
  reducers: {
    changeCurrency: {
      reducer(state, action) {
        state.current = action.payload;
        localStorage.setItem("currency", action.payload);
      },
    },
  },
});

export const currencyReducer = currencySlice.reducer;

export const { changeCurrency } = currencySlice.actions;
