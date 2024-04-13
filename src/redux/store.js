import { configureStore } from "@reduxjs/toolkit";
import { currencyReducer } from "./shop/currencySlice";
import { cartReducer } from "./shop/cartSlice";
import { wishlistReducer } from "./shop/wishlistSlice";

export const store = configureStore({
  reducer: {
    currency: currencyReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
