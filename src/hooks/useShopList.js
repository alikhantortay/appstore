import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectCompare,
  selectWishlist,
} from "../redux/shop/selectors";
import {
  addToCart,
  removeFromCart,
} from "../redux/shop/cartSlice";
import {
  addToCompare,
  removeFromCompare,
} from "../redux/shop/compareListSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/shop/wishlistSlice";

export const useShopList = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const wishlist = useSelector(selectWishlist);
  const compare = useSelector(selectCompare);

  const checkIsInList = (id, listType) => {
    switch (listType) {
      case "cart":
        return cart.some((item) => {
          return item.id === id;
        });
      case "wishlist":
        return wishlist.includes(id);
      case "compare":
        return compare.includes(id);
      default:
        return wishlist.includes(id);
    }
  };

  const modifyList = (id, listType, quantity = 1) => {
    switch (listType) {
      case "cart":
        checkIsInList(id, listType)
          ? dispatch(removeFromCart(id))
          : dispatch(addToCart({ id, quantity }));
        break;
      case "wishlist":
        checkIsInList(id, listType)
          ? dispatch(removeFromWishlist(id))
          : dispatch(addToWishlist(id));
        break;
      case "compare":
        checkIsInList(id, listType)
          ? dispatch(removeFromCompare(id))
          : dispatch(addToCompare(id));
        break;
      default:
        checkIsInList(id, listType)
          ? dispatch(removeFromWishlist(id))
          : dispatch(addToWishlist(id));
    }
  };

  return { checkIsInList, modifyList };
};
