import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/slice";
import { currencyReducer } from "./shop/currencySlice";
import { cartReducer } from "./shop/cartSlice";
import { wishlistReducer } from "./shop/wishlistSlice";
import { categoriesReducer } from "./shop/categoriesSlice";
import { compareReducer } from "./shop/cpmpareListSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    currency: currencyReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
