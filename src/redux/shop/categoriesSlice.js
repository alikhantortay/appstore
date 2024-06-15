import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get("/products/categories");
      return res.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e.response.data.message,
      );
    }
  },
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchCategories.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.error = null;
          action.payload.map(
            (item) =>
              (item.img = require(`../../images/categories/${item.slug}.webp`)),
          );
          state.items = action.payload;
        },
      )
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchCategories.rejected,
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        },
      );
  },
});

export const categoriesReducer = categoriesSlice.reducer;
