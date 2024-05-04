import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "./auth/slice";
import { currencyReducer } from "./shop/currencySlice";
import { cartReducer } from "./shop/cartSlice";
import { wishlistReducer } from "./shop/wishlistSlice";

export const store = configureStore({
  reducer: {
    user: authReducer,
    currency: currencyReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
