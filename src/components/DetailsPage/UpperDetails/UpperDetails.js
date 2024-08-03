import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useState } from "react";
import { usePrice } from "../../../hooks/usePrice";
import { useShopList } from "../../../hooks/useShopList";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../../redux/shop/selectors";
import { addToCart } from "../../../redux/shop/cartSlice";

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
} from "./UpperDetails.styled";

export const UpperDetails = ({ item }) => {
  const { countPrice, countSalePrice } = usePrice();
  const { checkIsInList, modifyList } = useShopList();
  const dispatch = useDispatch();

  const {
    id,
    sku,
    title,
    brand,
    category,
    price,
    discountPercentage,
    stock,
    availabilityStatus,
    rating,
    reviews,
  } = item;

  const cart = useSelector(selectCart);
  const inCart = checkIsInList(id, "cart");
  const inWishlist = checkIsInList(id, "wishlist");
  const inCompare = checkIsInList(id, "compare");

  const [quantity, setQuantity] = useState(
    inCart
      ? cart.find((item) => item.id === id).quantity
      : 1,
  );

  return (
    <UpperDetailsStyled>
      <DetailsStarRatingStyled>
        <Stars rating={rating} />
        <span>{rating} Star Rating</span>
        {reviews.length > 0 && (
          <p>({reviews.length} User feedbacks)</p>
        )}
      </DetailsStarRatingStyled>

      <h1>{title}</h1>

      <ProductInfoStyled $inStock={stock > 10}>
        <li>
          <p>
            Sku: <span>{sku}</span>
          </p>
        </li>
        <li>
          <p>
            Brand:{" "}
            <Link to={`/shop?q=${brand || "clicon"}`}>
              {brand.replaceAll("-", " ") || "Clicon"}
            </Link>
          </p>
        </li>
        <li>
          <p>
            Availability: <span>{availabilityStatus}</span>
          </p>
        </li>
        <li>
          <p>
            Category:{" "}
            <Link to={`/shop/${category}`}>
              {category.replaceAll("-", " ")}
            </Link>
          </p>
        </li>
      </ProductInfoStyled>

      <DetailsPriceStyled>
        {countSalePrice(price, discountPercentage)}
        {discountPercentage > 10 && (
          <p>{countPrice(price)}</p>
        )}
        {discountPercentage > 10 && (
          <span>{discountPercentage.toFixed()}% OFF</span>
        )}
      </DetailsPriceStyled>

      <DetailsBtnsStyled>
        <DetailsQuantity
          id={id}
          inCart={inCart}
          quantity={quantity}
          setQuantity={setQuantity}
        />
        <CartBtn id={id} quantity={quantity} big />
        <DetailsBuyLinkStyled
          to="/shopping-cart/checkout"
          onClick={() => {
            !inCart &&
              dispatch(
                addToCart({
                  id: id,
                  quantity,
                }),
              );
          }}>
          BUY NOW
        </DetailsBuyLinkStyled>
        <DetailsListBtnsStyled>
          <button
            type="button"
            onClick={() => modifyList(id, "wishlist")}>
            <HeartIcon />
            {inWishlist
              ? "Remove from Wishlist"
              : "Add to Wishlist"}
          </button>
          <button
            type="button"
            onClick={() => modifyList(id, "compare")}>
            <CompareIcon />
            {inCompare
              ? "Remove from Compare"
              : "Add to Compare"}
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
          loading="lazy"
        />
      </DetailsCardsStyled>
    </UpperDetailsStyled>
  );
};

UpperDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    sku: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
    availabilityStatus: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
};
