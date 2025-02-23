import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/shop/selectors";
import { addToCart } from "../../../redux/shop/cartSlice";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Stars } from "../../Stars/Stars";
import { DetailsQuantity } from "../DetailsQuantity/DetailsQuantity";
import { CartBtn } from "../../CartBtn/CartBtn";
import { ShareBtns } from "../ShareBtns/ShareBtns";
import { ReactComponent as HeartIcon } from "../../../icons/Heart.svg";
import { ReactComponent as CompareIcon } from "../../../icons/Compare.svg";

import {
  DetailsBtnsStyled,
  DetailsBuyLinkStyled,
  DetailsCardsStyled,
  DetailsListBtnsStyled,
  DetailsPriceStyled,
  DetailsStarRatingStyled,
  ProductInfoStyled,
  UpperDetailsStyled,
  UpperDetailsTextStyled,
} from "./UpperDetails.styled";
import { Container } from "../../Container/Container";
import { DetailsSwiper } from "../DetailsSwiper/DetailsSwiper";

const IMAGE_API_URL = "https://appstore.up.railway.app/shop-service/api/public/images/";
const API_WISHLIST_ADD = "https://appstore.up.railway.app/shop-service/api/user/add-favorite";
const API_WISHLIST_REMOVE = "https://appstore.up.railway.app/shop-service/api/user/remove-favorite";

export const UpperDetails = ({ item }) => {
  const { countPrice } = usePrice();
  const dispatch = useDispatch();

  const {
    id,
    individualCode,
    name,
    categoryName,
    price,
    quantity,
    description,
    specificParams,
    imageUrls,
  } = item;

  const cart = useSelector(selectCart);
  const inCart = cart.some((cartItem) => cartItem.id === id);

  // ✅ Состояние для избранного
  const [inWishlist, setInWishlist] = useState(false);

  // ✅ Функция получения URL изображения
  const getImageUrl = (fileName) => {
    return fileName ? `${IMAGE_API_URL}${encodeURIComponent(fileName)}` : "/placeholder.png";
  };

  // ✅ Добавление в избранное
  const handleWishlistToggle = async () => {
    const token = sessionStorage.getItem("accessToken");

    if (!token) {
      Notify.failure("Ошибка: отсутствует токен авторизации!");
      return;
    }

    try {
      if (inWishlist) {
        // Удаление товара из избранного
        await axios.delete(`https://appstore.up.railway.app/shop-service/api/user/remove-favorite/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Notify.success("Товар удален из избранного!");
      } else {
        // Добавление в избранное (🔥 productId передается в URL, не в body)
        await axios.post(`https://appstore.up.railway.app/shop-service/api/user/add-favorite/${id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Notify.success("Товар добавлен в избранное!");
      }

      setInWishlist(!inWishlist);
    } catch (error) {
      console.error("Ошибка при изменении избранного:", error);
      Notify.failure("Не удалось обновить избранное.");
    }
  };




  return (
      <UpperDetailsStyled>
        <Container>
          {/* 🔥 Показываем изображения */}
          <DetailsSwiper title={name} images={imageUrls?.map(getImageUrl)} />

          <UpperDetailsTextStyled>
            <DetailsStarRatingStyled>
              <Stars rating={4.5} />
              <span>4.5 Star Rating</span>
            </DetailsStarRatingStyled>

            <h1>{name}</h1>

            <ProductInfoStyled $inStock={quantity > 0}>
              <li>
                <p>
                  SKU: <span>{individualCode}</span>
                </p>
              </li>
              <li>
                <p>
                  Category:{" "}
                  <Link to={`/shop/${categoryName}`}>
                    {categoryName || "Unknown"}
                  </Link>
                </p>
              </li>
              <li>
                <p>
                  Availability: <span>{quantity > 0 ? "In Stock" : "Out of Stock"}</span>
                </p>
              </li>
            </ProductInfoStyled>

            {/* 💲 Цена */}
            <DetailsPriceStyled>
              <span>{countPrice(price)}</span>
            </DetailsPriceStyled>

            {/* 📝 Описание */}
            {description && <p>{description}</p>}

            {/* 🔹 Специфические параметры */}
            {specificParams && Object.keys(specificParams).length > 0 && (
                <div>
                  <h3>Specifications:</h3>
                  <ul>
                    {Object.entries(specificParams).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value}
                        </li>
                    ))}
                  </ul>
                </div>
            )}

            <DetailsBtnsStyled>
              <DetailsQuantity id={id} inCart={inCart} quantity={1} setQuantity={() => {}} />
              <CartBtn id={id} quantity={1} big />
              <DetailsBuyLinkStyled
                  to="/shopping-cart/checkout"
                  onClick={() => {
                    if (!inCart) {
                      dispatch(addToCart({ id, quantity: 1 }));
                    }
                  }}
              >
                BUY NOW
              </DetailsBuyLinkStyled>
              <DetailsListBtnsStyled>
                <button type="button" onClick={handleWishlistToggle}>
                  <HeartIcon />
                  {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                </button>
              </DetailsListBtnsStyled>
              <ShareBtns />
            </DetailsBtnsStyled>

            <DetailsCardsStyled>
              <p>100% Guarantee Safe Checkout</p>
              <img
                  src={require("../../../images/payment.png")}
                  alt="Bank cards"
                  width={312}
                  height={18}
                  loading="lazy"
              />
            </DetailsCardsStyled>
          </UpperDetailsTextStyled>
        </Container>
      </UpperDetailsStyled>
  );
};

UpperDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    individualCode: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    categoryName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    description: PropTypes.string,
    specificParams: PropTypes.object,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default UpperDetails;
