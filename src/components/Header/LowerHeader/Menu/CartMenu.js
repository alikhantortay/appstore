import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCart } from "../../../../redux/shop/selectors";

import { ReactComponent as CartIcon } from "../../../../icons/Cart.svg";
import { CartModal } from "../Modal/CartModal";

import { MenuStyled } from "./Menu.styled";
import axios from "axios";

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

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const apiBaseUrl2 = "https://appstore.up.railway.app/shop-service/api/user/cart";

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          console.error("Ошибка: Токен отсутствует.");
          return;
        }

        const response = await axios.get(`${apiBaseUrl2}/by-session/get`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("🛒 Cart items:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setItems(response.data.map((item) => ({
            ...item,
            quantity: item.quantity || 1, // ✅ Если quantity отсутствует, ставим 1
          })));
        }
      } catch (error) {
        console.error("Ошибка загрузки корзины:", error.response ? error.response.data : error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <MenuStyled $quantity={totalItemsCount}>
      <button
        name="cart"
        type="button"
        aria-label="Open Cart Modal"
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
