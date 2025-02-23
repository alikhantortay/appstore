import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { usePrice } from "../../../../hooks/usePrice";
import { selectCart } from "../../../../redux/shop/selectors";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { removeFromCart } from "../../../../redux/shop/cartSlice";

import { Loader } from "../../../Loader/Loader";
import { ReactComponent as CrossIcon } from "../../../../icons/header/X.svg";
import { ReactComponent as ArrowRightIcon } from "../../../../icons/ArrowRight.svg";

import {
  CartModalPriceStyled,
  EmptyMessageStyled,
  ModalLinkStyled,
  ModalListStyled,
  ModalLowerStyled,
  ModalStyled,
  ModalTitleStyled,
} from "./Modal.styled";

export const CartModal = ({ onClick }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCart);
  const { countSalePrice } = usePrice();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiBaseUrl = "https://appstore.up.railway.app/shop-service/api/user/cart";

  // ✅ Загружаем список товаров из API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          console.error("Ошибка: Токен отсутствует.");
          return;
        }

        const response = await axios.get(`${apiBaseUrl}/by-session/get`, {
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

  // ✅ Получение изображения товара
  const getImageUrl = (fileName) => {
    return fileName
        ? `https://appstore.up.railway.app/shop-service/api/public/images/${encodeURIComponent(fileName)}`
        : "/placeholder.png";
  };

  // ✅ Общее количество товаров в корзине
  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // ✅ Общая сумма корзины
  const subTotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
      <ModalStyled name="cart">
        <ModalTitleStyled>
          Корзина{" "}
          {totalItemsCount > 0 && (
              <span>({totalItemsCount > 9 ? totalItemsCount : "0" + totalItemsCount})</span>
          )}
        </ModalTitleStyled>

        {items.length > 0 ? (
            <ModalListStyled>
              {items.map(({ id, imageUrls, name, categoryName, quantity, price, discountPercentage }) => (
                  <li key={id}>
                    <img
                        src={getImageUrl(imageUrls ? imageUrls[0] : "")}
                        alt={name}
                        width="80px"
                        height="80px"
                        loading="lazy"
                    />
                    <div>
                      <Link
                          to={`/shop/${categoryName}/${name ? name.toLowerCase().replaceAll(" ", "-") : "unknown"}?id=${id}`}
                          onClick={onClick}
                      >
                        {name}
                      </Link>
                      <CartModalPriceStyled>
                        {quantity} x{" "}
                        <span>{countSalePrice(price, discountPercentage)}</span>
                      </CartModalPriceStyled>
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                          dispatch(removeFromCart(id));
                          setItems((prevState) => prevState.filter((item) => item.id !== id));
                        }}
                    >
                      <CrossIcon />
                    </button>
                  </li>
              ))}
            </ModalListStyled>
        ) : (
            <EmptyMessageStyled>Ваша корзина пуста!</EmptyMessageStyled>
        )}

        <ModalLowerStyled>
          {items.length > 0 && (
              <>
                <p>Sub-Total:</p>
                <span>{subTotal.toLocaleString()} $</span>
              </>
          )}
          <ModalLinkStyled to="/shopping-cart" onClick={onClick}>
            Посмотреть корзину
            <ArrowRightIcon />
          </ModalLinkStyled>
        </ModalLowerStyled>

        {error && Notify.failure(error.message)}
        {loading && <Loader />}
      </ModalStyled>
  );
};
