export const selectCurrency = (state) =>
  state.currency.current;

export const selectCategories = (state) =>
  state.categories.items;

export const selectCart = (state) => state.cart;

export const selectWishlist = (state) => state.wishlist;

export const selectCompare = (state) => state.compare;
