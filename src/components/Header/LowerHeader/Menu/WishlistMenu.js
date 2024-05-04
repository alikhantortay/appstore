import { useSelector } from "react-redux";
import { ReactComponent as HeartIcon } from "../../../../icons/Heart.svg";

import { selectWishlist } from "../../../../redux/shop/selectors";
import { useEffect, useState } from "react";
import { MenuStyled } from "./Menu.styled";
import { WishlistModal } from "./Modal/WishlistModal";

export const WishlistMenu = () => {
  const [isWishlistOpen, setIsWishlistOpen] =
    useState(false);
  const wishlistItems = useSelector(selectWishlist);

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      !e.target.closest('[name="wishlist"]') &&
        setIsWishlistOpen(false);
    });

    return () => {
      document.removeEventListener("mousedown", (e) => {
        !e.target.closest('[name="wishlist"]') &&
          setIsWishlistOpen(false);
      });
    };
  });

  return (
    <MenuStyled $quantity={wishlistItems.length}>
      <button
        name="wishlist"
        type="button"
        onClick={() =>
          setIsWishlistOpen((prevState) => !prevState)
        }>
        <HeartIcon />
      </button>
      {isWishlistOpen && <WishlistModal />}
    </MenuStyled>
  );
};
