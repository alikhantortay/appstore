import {
  addToCart,
  removeFromCart,
} from "./redux/shop/cartSlice";
import {
  addToCompare,
  removeFromCompare,
} from "./redux/shop/cpmpareListSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "./redux/shop/wishlistSlice";
import { store } from "./redux/store";

export const handleShopBtnClick = (
  id,
  listType,
  dispatch,
) => {
  const cart = store.getState().cart;
  const wishlist = store.getState().wishlist;
  const compare = store.getState().compare;

  switch (listType) {
    case "cart":
      cart.some((item) => {
        return item.id === id;
      })
        ? dispatch(removeFromCart(id))
        : dispatch(addToCart({ id, quantity: 1 }));
      break;
    case "wishlist":
      wishlist.includes(id)
        ? dispatch(removeFromWishlist(id))
        : dispatch(addToWishlist(id));
      break;
    case "compare":
      compare.includes(id)
        ? dispatch(removeFromCompare(id))
        : dispatch(addToCompare(id));
      break;
    default:
      wishlist.includes(id)
        ? dispatch(removeFromWishlist(id))
        : dispatch(addToWishlist(id));
  }
};
