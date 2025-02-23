import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, thunkAPI) => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');

            const res = await axios.get("/categories", {
                headers: { Authorization: `Bearer ${accessToken}` }
            });

            return res.data;
        } catch (e) {
            console.error("Fetch categories error:", e);
            return thunkAPI.rejectWithValue(e.response?.data?.message || "Unknown error");
        }
    }
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
