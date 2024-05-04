import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { displayName: null, isLoggedIn: false },
  },
  reducers: {
    addUser: {
      reducer(state, action) {
        const { displayName } = action.payload;
        state.user = { displayName, isLoggedIn: true };
      },
    },

    removeUser(state) {
      state.user = { displayName: null, isLoggedIn: false };
    },
  },
});

export const authReducer = authSlice.reducer;

export const { addUser, removeUser } = authSlice.actions;
