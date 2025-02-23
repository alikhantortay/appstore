import { useEffect, useState } from "react";
import axios from "axios";
import { usePrice } from "../../hooks/usePrice";
import { Helmet } from "react-helmet-async";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Container } from "../../components/Container/Container";
import { Loader } from "../../components/Loader/Loader";
import { ReactComponent as CrossCircleIcon } from "../../icons/XCircle.svg";

import {
  SectionStyled,
  ErrorMessageStyled,
} from "../../styles/common";
import {
  ListWrapper,
  ListPriceStyled,
  ListStockStatusStyled,
  ListRemoveBtnStyled,
} from "../../styles/listStyles";
import {
  WishlistHeadingsStyled,
  WishlistLinkStyled,
  WishlistStyled,
  WishlistBtnsStyled,
} from "./Wishlist.styled";

const API_BASE_URL = "https://appstore.up.railway.app/shop-service/api";
const API_WISHLIST = `${API_BASE_URL}/user/favorite-products`;
const API_REMOVE_WISHLIST = `${API_BASE_URL}/user/remove-favorite`;
const API_IMAGE_BASE = `${API_BASE_URL}/public/images/`;

const Wishlist = () => {
  const { countPrice, countSalePrice } = usePrice();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Получаем список избранных товаров
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const token = sessionStorage.getItem("accessToken");

        if (!token) {
          Notify.failure("Ошибка: отсутствует токен авторизации!");
          return;
        }

        const response = await axios.get(API_WISHLIST, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data?.productResponse && Array.isArray(response.data.productResponse)) {
          setItems(response.data.productResponse);
        }
      } catch (error) {
        console.error("❌ Ошибка загрузки избранного:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // ✅ Удаление товара из избранного
  const removeFromWishlistHandler = async (productId) => {
    if (!productId) {
      Notify.failure("Ошибка: Не удалось определить товар!");
      return;
    }

    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) {
        Notify.failure("Ошибка: отсутствует токен авторизации!");
        return;
      }

      await axios.delete(`${API_REMOVE_WISHLIST}/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
      Notify.success("✅ Товар успешно удален из избранного!");
    } catch (error) {
      console.error("❌ Ошибка удаления из избранного:", error);
      Notify.failure("Ошибка: Не удалось удалить товар.");
    }
  };

  return (
      <SectionStyled>
        <Helmet>
          <title>Избранное</title>
        </Helmet>

        <Container>
          <ListWrapper>
            <h2>Избранное</h2>

            {items.length > 0 ? (
                <>
                  <WishlistHeadingsStyled>
                    <li><p>PRODUCTS</p></li>
                    <li><p>PRICE</p></li>
                    <li><p>STOCK STATUS</p></li>
                    <li><p>ACTIONS</p></li>
                  </WishlistHeadingsStyled>

                  <WishlistStyled>
                    {items.map(({ id, name, categoryName, imageUrls, price, discountPercentage, quantity }) => (
                        <li key={id}>
                          <WishlistLinkStyled to={`/shop/${categoryName}/${name.toLowerCase().replaceAll(" ", "-")}?id=${id}`}>
                            <img
                                src={imageUrls?.length > 0 ? `${API_IMAGE_BASE}${imageUrls[0]}` : "/placeholder.png"}
                                alt={name}
                                width={72}
                                height={72}
                                loading="lazy"
                            />
                            {name}
                          </WishlistLinkStyled>

                          <ListPriceStyled>
                            {discountPercentage > 10 && <span>{countPrice(price)}</span>}
                            {countSalePrice(price, discountPercentage)}
                          </ListPriceStyled>

                          <ListStockStatusStyled $inStock={quantity > 0}>
                            {quantity > 0 ? "IN STOCK" : "OUT OF STOCK"}
                          </ListStockStatusStyled>

                          <WishlistBtnsStyled>
                            <ListRemoveBtnStyled type="button" aria-label="Удалить из избранного" onClick={() => removeFromWishlistHandler(id)}>
                              <CrossCircleIcon />
                            </ListRemoveBtnStyled>
                          </WishlistBtnsStyled>
                        </li>
                    ))}
                  </WishlistStyled>
                </>
            ) : (
                <p>Ваш список избранного пуст!</p>
            )}
          </ListWrapper>

          {error && <ErrorMessageStyled>{error.message}</ErrorMessageStyled>}
          {loading && <Loader />}
        </Container>
      </SectionStyled>
  );
};

export default Wishlist;
