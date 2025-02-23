import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { username: null, role: null, isLoggedIn: false },
    token: null, // Добавьте токен в состояние
  },
  reducers: {
    addUser: (state, action) => {
      const { username, role, token } = action.payload;
      state.user = { username, role, isLoggedIn: true };
      state.token = token; // Сохраняем токен
    },
    removeUser: (state) => {
      state.user = { username: null, role: null, isLoggedIn: false };
      state.token = null; // Удаляем токен
    },
  },
});

export const authReducer = authSlice.reducer;
export const { addUser, removeUser } = authSlice.actions;
