import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePrice } from "../../hooks/usePrice";
import { useShopList } from "../../hooks/useShopList";
import { fetch } from "../../API";
import {
  DetailsBuyLinkStyled,
  DetailsBtnsStyled,
  DetailsPriceStyled,
  DetailsStarRatingStyled,
  DetailsWrapper,
  ProductInfoStyled,
  UpperDetailsStyled,
  DetailsListBtnsStyled,
  DetailsCardsStyled,
} from "./Details.styled";

import { ReactComponent as HeartIcon } from "../../icons/Heart.svg";
import { ReactComponent as CompareIcon } from "../../icons/Compare.svg";

import { Container } from "../../components/Container/Container";
import { DetailsSwiper } from "../../components/DetailsPage/DetailsSwiper/DetailsSwiper";
import { Stars } from "../../components/Stars/Stars";
import { DetailsQuantity } from "../../components/DetailsPage/DetailsQuantity/DetailsQuantity";
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../../redux/shop/selectors";
import { CartBtn } from "../../components/CartBtn/CartBtn";
import { addToCart } from "../../redux/shop/cartSlice";
import { ShareBtns } from "../../components/DetailsPage/ShareBtns/ShareBtns";

const Details = () => {
  const { countPrice, countSalePrice } = usePrice();
  const { checkIsInList, modifyList } = useShopList();
  const dispatch = useDispatch();
  const id = useLocation().state;

  const [item, setItem] = useState(null);
  const cart = useSelector(selectCart);

  const inCart = checkIsInList(id, "cart");
  const inWishlist = checkIsInList(id, "wishlist");
  const inCompare = checkIsInList(id, "compare");

  const [quantity, setQuantity] = useState(
    inCart
      ? cart.find((item) => item.id === id).quantity
      : 1,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getItem = async () => {
      try {
        setLoading(true);
        const responce = await fetch(`/${id}`);
        setItem(responce.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    getItem();
  }, [id]);

  return (
    <div>
      <Container>
        {item && (
          <DetailsWrapper>
            <DetailsSwiper
              title={item.title}
              images={item.images}
            />
            <UpperDetailsStyled>
              <DetailsStarRatingStyled>
                <Stars rating={item.rating} />
                <span>{item.rating} Star Rating</span>
                {item.reviews.length > 0 && (
                  <p>
                    ({item.reviews.length} User feedbacks)
                  </p>
                )}
              </DetailsStarRatingStyled>
              <h1>{item.title}</h1>
              <ProductInfoStyled $inStock={item.stock > 10}>
                <p>
                  Sku: <span>{item.sku}</span>
                </p>
                <p>
                  Brand:{" "}
                  <span>{item.brand || "Clicon"}</span>
                </p>
                <p>
                  Availability:{" "}
                  <span>{item.availabilityStatus}</span>
                </p>
                <p>
                  Category: <span>{item.category}</span>
                </p>
              </ProductInfoStyled>
              <DetailsPriceStyled>
                {countSalePrice(
                  item.price,
                  item.discountPercentage,
                )}
                {item.discountPercentage > 10 && (
                  <p>{countPrice(item.price)}</p>
                )}
                {item.discountPercentage > 10 && (
                  <span>
                    {item.discountPercentage.toFixed()}% OFF
                  </span>
                )}
              </DetailsPriceStyled>

              <DetailsBtnsStyled>
                <DetailsQuantity
                  id={item.id}
                  inCart={inCart}
                  quantity={quantity}
                  setQuantity={setQuantity}
                />
                <CartBtn
                  id={item.id}
                  quantity={quantity}
                  big
                />
                <DetailsBuyLinkStyled
                  to="/shopping-cart/checkout"
                  onClick={() => {
                    !inCart &&
                      dispatch(
                        addToCart({
                          id: item.id,
                          quantity,
                        }),
                      );
                  }}>
                  BUY NOW
                </DetailsBuyLinkStyled>

                <DetailsListBtnsStyled>
                  <button
                    type="button"
                    onClick={() =>
                      modifyList(item.id, "wishlist")
                    }>
                    <HeartIcon />
                    {inWishlist
                      ? "Remove from Wishlist"
                      : "Add to Wishlist"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      modifyList(item.id, "compare")
                    }>
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
                  src={require("../../images/payment.png")}
                  alt="Bank cards"
                  width={312}
                  loading="lazy"
                />
              </DetailsCardsStyled>
            </UpperDetailsStyled>
          </DetailsWrapper>
        )}
      </Container>
    </div>
  );
};

export default Details;
