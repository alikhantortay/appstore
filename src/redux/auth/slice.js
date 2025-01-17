import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { username: null, role: null, isLoggedIn: false },
  },
  reducers: {
    addUser: (state, action) => {
      const { username, role } = action.payload;
      state.user = { username, role, isLoggedIn: true };
    },
    removeUser: (state) => {
      state.user = { username: null, role: null, isLoggedIn: false };
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addUser, removeUser } = authSlice.actions;

