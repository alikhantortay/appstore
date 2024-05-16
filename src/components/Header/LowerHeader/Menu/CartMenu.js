import { useSelector } from "react-redux";
import { ReactComponent as CartIcon } from "../../../../icons/Cart.svg";

import { selectCart } from "../../../../redux/shop/selectors";
import { useEffect, useState } from "react";
import { MenuStyled } from "./Menu.styled";
import { CartModal } from "./Modal/CartModal";

export const CartMenu = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartItems = useSelector(selectCart);

  let numberOfItems = 0;
  cartItems.length > 0 &&
    cartItems.map(
      ({ quantity }) => (numberOfItems += quantity),
    );

  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      !e.target.closest('[name="cart"]') &&
        setIsCartOpen(false);
    });

    return () => {
      document.removeEventListener("mousedown", (e) => {
        !e.target.closest('[name="cart"]') &&
          setIsCartOpen(false);
      });
    };
  });

  return (
    <MenuStyled $quantity={numberOfItems}>
      <button
        name="cart"
        type="button"
        onClick={() =>
          setIsCartOpen((prevState) => !prevState)
        }>
        <CartIcon />
      </button>
      {isCartOpen && (
        <CartModal onClick={() => setIsCartOpen(false)} />
      )}
    </MenuStyled>
  );
};
