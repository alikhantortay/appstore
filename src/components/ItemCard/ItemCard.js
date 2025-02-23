import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useShopList } from "../../hooks/useShopList";
import { usePrice } from "../../hooks/usePrice";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { ReactComponent as HeartIcon } from "../../icons/Heart.svg";
import { ReactComponent as CartIcon } from "../../icons/Cart.svg";

import {
  HoverBtnsStyled,
  ImgWrapper,
  ItemCardStyled,
  ListBtnStyled,
  PriceStyled,
} from "./ItemCard.styled";

export const ItemCard = ({ item, bestDeals, setItems, setWishlist }) => {
  const { checkIsInList, modifyList } = useShopList();
  const { countPrice } = usePrice();
  const [thumbnail, setThumbnail] = useState("/placeholder.png");

  const apiBaseUrl = "https://appstore.up.railway.app/shop-service/api/public";
  const apiUserUrl = "https://appstore.up.railway.app/shop-service/api/user";

  useEffect(() => {
    const fetchImage = async (fileName) => {
      if (!fileName) return;
      const imageUrl = `${apiBaseUrl}/images/${encodeURIComponent(fileName)}`;

      try {
        const response = await fetch(imageUrl);
        if (!response.ok) throw new Error("Ошибка загрузки изображения");
        const blob = await response.blob();
        setThumbnail(URL.createObjectURL(blob));
      } catch (error) {
        console.error(error);
      }
    };

    if (item?.imageUrls?.length > 0) {
      fetchImage(item.imageUrls[0]);
    }
  }, [item?.imageUrls]);

  if (!item) return null;

  const { id, name, categoryName, price } = item;

  // ✅ Добавление в корзину
  const addToCart = async () => {
    try {
      const response = await axios.post(`${apiUserUrl}/cart/cart-item/${id}/1/create`, null, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      });

      if (response.status === 200 || response.status === 201) {
        Notify.success("Товар добавлен в корзину!");
        updateCartItems();
      }
    } catch (error) {
      console.error("Ошибка добавления в корзину:", error);
      Notify.failure("Не удалось добавить в корзину.");
    }
  };

  // ✅ Получение обновленного списка корзины
  const updateCartItems = async () => {
    try {
      const response = await axios.get(`${apiUserUrl}/cart/by-session/get`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      });

      if (response.data && Array.isArray(response.data)) {
        setItems(response.data);
      }
    } catch (error) {
      console.error("Ошибка обновления корзины:", error);
    }
  };

  // ✅ Добавление в избранное
  const addToWishlist = async () => {
    try {
      const response = await axios.post(`${apiUserUrl}/add-favorite/${id}`, null, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      });

      if (response.status === 200 || response.status === 201) {
        Notify.success("Товар добавлен в избранное!");
        updateWishlistItems();
      }
    } catch (error) {
      console.error("Ошибка добавления в избранное:", error);
      Notify.failure("Не удалось добавить в избранное.");
    }
  };

  // ✅ Получение списка избранного
  const updateWishlistItems = async () => {
    try {
      const response = await axios.get(`${apiUserUrl}/wishlist`, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("accessToken")}` },
      });

      if (response.data && Array.isArray(response.data)) {
        setWishlist(response.data);
      }
    } catch (error) {
      console.error("Ошибка обновления избранного:", error);
    }
  };

  return (
      <ItemCardStyled>
        <ImgWrapper tabIndex="0">
          <img src={thumbnail} alt={name} width={bestDeals ? 216 : 202} height={bestDeals ? 216 : 202} loading="lazy" />
          <HoverBtnsStyled>
            <ListBtnStyled type="button" aria-label="Добавить в избранное" onClick={addToWishlist}>
              <HeartIcon />
            </ListBtnStyled>
            <ListBtnStyled type="button" aria-label="Добавить в корзину" onClick={addToCart}>
              <CartIcon />
            </ListBtnStyled>
          </HoverBtnsStyled>
        </ImgWrapper>

        <Link to={`/shop/${categoryName}/${name.toLowerCase().replaceAll(" ", "-")}?id=${id}`}>
          {name}
        </Link>

        <PriceStyled>{countPrice(price)}</PriceStyled>
      </ItemCardStyled>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    imageUrls: PropTypes.array,
    name: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  setItems: PropTypes.func,
  setWishlist: PropTypes.func,
};
