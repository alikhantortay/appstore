import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { username: null, isLoggedIn: false },
  },
  reducers: {
    addUser: (state, action) => {
      const { username } = action.payload;
      state.user = { username, isLoggedIn: true };
    },
    removeUser: (state) => {
      state.user = { username: null, isLoggedIn: false };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addUser, removeUser } = authSlice.actions;
