import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useShopList } from "../../hooks/useShopList";
import { usePrice } from "../../hooks/usePrice";

import { Stars } from "../Stars/Stars";
import { ReactComponent as HeartIcon } from "../../icons/Heart.svg";
import { ReactComponent as CartIcon } from "../../icons/Cart.svg";
import { ReactComponent as EyeIcon } from "../../icons/Eye.svg";

import {
  DiscountWarningStyled,
  HotWarningStyled,
  HoverBtnsStyled,
  ImgWrapper,
  ItemCardStyled,
  ListBtnStyled,
  OldPriceStyled,
  PriceStyled,
  StarRatingStyled,
} from "./ItemCard.styled";

export const ItemCard = ({ item, bestDeals }) => {
  const { checkIsInList, modifyList } = useShopList();
  const { countPrice, countSalePrice } = usePrice();

  const {
    id,
    title,
    category,
    thumbnail,
    price,
    discountPercentage,
    rating,
    reviews,
  } = item;

  return (
    <ItemCardStyled>
      {discountPercentage > 10 && (
        <DiscountWarningStyled>
          {`${Math.round(discountPercentage)}% OFF`}
        </DiscountWarningStyled>
      )}
      {id === 133 && (
        <HotWarningStyled>HOT</HotWarningStyled>
      )}

      <ImgWrapper tabIndex="0">
        <img
          src={thumbnail}
          alt={title}
          width={bestDeals ? 216 : 202}
          height={bestDeals ? 216 : 202}
          loading="lazy"
        />
        <HoverBtnsStyled>
          <ListBtnStyled
            type="button"
            onClick={() => modifyList(id, "wishlist")}
            $inList={checkIsInList(id, "wishlist")}>
            <HeartIcon />
          </ListBtnStyled>
          <ListBtnStyled
            type="button"
            onClick={() => modifyList(id, "cart")}
            $inList={checkIsInList(id, "cart")}>
            <CartIcon />
          </ListBtnStyled>
          <ListBtnStyled
            type="button"
            onClick={() => modifyList(id, "compare")}
            $inList={checkIsInList(id, "compare")}>
            <EyeIcon />
          </ListBtnStyled>
        </HoverBtnsStyled>
      </ImgWrapper>

      {!bestDeals && (
        <StarRatingStyled>
          <Stars rating={rating} />
          {reviews.length && <p>{`(${reviews.length})`}</p>}
        </StarRatingStyled>
      )}
      <Link
        to={`/shop/${category}/${title
          .toLowerCase()
          .replaceAll(" ", "-")}?id=${id}`}>
        {title}
      </Link>

      {discountPercentage > 10 && (
        <OldPriceStyled>{countPrice(price)}</OldPriceStyled>
      )}
      <PriceStyled>
        {countSalePrice(price, discountPercentage)}
      </PriceStyled>
    </ItemCardStyled>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.array.isRequired,
  }).isRequired,
};
