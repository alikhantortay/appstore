import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectWishlist } from "../../../../redux/shop/selectors";

import { ReactComponent as HeartIcon } from "../../../../icons/Heart.svg";
import { WishlistModal } from "../Modal/WishlistModal";

import { MenuStyled } from "./Menu.styled";

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
      {isWishlistOpen && (
        <WishlistModal
          onClick={() => setIsWishlistOpen(false)}
        />
      )}
    </MenuStyled>
  );
};
