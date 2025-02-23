import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePrice } from "../../../../hooks/usePrice";
import axios from "axios";
import { removeFromWishlist } from "../../../../redux/shop/wishlistSlice";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Loader } from "../../../Loader/Loader";
import { ReactComponent as CrossIcon } from "../../../../icons/header/X.svg";
import { ReactComponent as ArrowRightIcon } from "../../../../icons/ArrowRight.svg";

import {
  EmptyMessageStyled,
  ModalLinkStyled,
  ModalListStyled,
  ModalLowerStyled,
  ModalStyled,
  ModalTitleStyled,
  WishlistModalPriceStyled,
} from "./Modal.styled";

const apiUserUrl = "https://appstore.up.railway.app/shop-service/api/user";

export const WishlistModal = ({ onClick }) => {
  const dispatch = useDispatch();
  const { countSalePrice } = usePrice();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Получение списка товаров в избранном
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("accessToken");
        if (!token) {
          Notify.failure("Ошибка: отсутствует токен авторизации!");
          return;
        }

        const response = await axios.get(`${apiUserUrl}/favorite-products`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data && response.data.productResponse) {
          setItems(response.data.productResponse);
        }
      } catch (error) {
        console.error("Ошибка загрузки избранного:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Удаление товара из избранного
  const removeFromWishlistHandler = async (id) => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        Notify.failure("Ошибка: отсутствует токен авторизации!");
        return;
      }

      await axios.delete(`${apiUserUrl}/remove-favorite/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(removeFromWishlist(id));
      setItems((prevState) => prevState.filter((item) => item.id !== id));

      Notify.success("Товар удален из избранного!");
    } catch (error) {
      console.error("Ошибка удаления из избранного:", error);
      Notify.failure("Не удалось удалить товар из избранного.");
    }
  };

  return (
      <ModalStyled name="wishlist" $wishlist>
        <ModalTitleStyled>
          Список избранное{" "}
          {items.length > 0 && (
              <span>
            ({items.length > 9 ? items.length : "0" + items.length})
          </span>
          )}
        </ModalTitleStyled>

        {items.length > 0 ? (
            <ModalListStyled>
              {items.map(({ id, name, categoryName, imageUrls, price }) => (
                  <li key={id}>
                    <img
                        src={imageUrls ? `https://appstore.up.railway.app/shop-service/api/public/images/${imageUrls[0]}` : "/placeholder.png"}
                        alt={name}
                        width="80px"
                        height="80px"
                        loading="lazy"
                    />
                    <div>
                      <Link
                          to={`/shop/${categoryName}/${name.toLowerCase().replaceAll(" ", "-")}?id=${id}`}
                          onClick={onClick}
                      >
                        {name}
                      </Link>
                      <WishlistModalPriceStyled>{countSalePrice(price)}</WishlistModalPriceStyled>
                    </div>
                    <button type="button" onClick={() => removeFromWishlistHandler(id)}>
                      <CrossIcon />
                    </button>
                  </li>
              ))}
            </ModalListStyled>
        ) : (
            <EmptyMessageStyled>Ваш список избранное пуст!</EmptyMessageStyled>
        )}

        <ModalLowerStyled>
          <ModalLinkStyled to="/wishlist" onClick={onClick}>
            Посмотреть список избранное
            <ArrowRightIcon />
          </ModalLinkStyled>
        </ModalLowerStyled>

        {error && Notify.failure(error.message)}
        {loading && <Loader />}
      </ModalStyled>
  );
};
