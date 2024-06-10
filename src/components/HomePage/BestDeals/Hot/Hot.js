import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  countPrice,
  countSalePrice,
} from "../../../../countPrice";

import { Stars } from "../../../Stars/Stars";
import { HotButtons } from "../HotButtons/HotButtons";

import {
  HotPriceStyled,
  HotStyled,
  HotWarningsStyled,
  StarRatingStyled,
} from "./Hot.styled";

export const Hot = ({ hot }) => {
  const {
    id,
    thumbnail,
    title,
    description,
    category,
    reviews,
    price,
    discountPercentage,
  } = hot;

  return (
    <HotStyled>
      <HotWarningsStyled>
        <span>{`${Math.round(
          discountPercentage,
        )}% OFF`}</span>
        <span>HOT</span>
      </HotWarningsStyled>
      <Link
        to={`shop/${category}/${title
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        state={id}>
        <img
          src={thumbnail}
          alt={title}
          width={280}
          height={280}
        />
      </Link>
      <StarRatingStyled>
        <Stars rating={3} bestDeals />
        {reviews.length && <p>{`(${reviews.length})`}</p>}
      </StarRatingStyled>
      <Link
        to={`shop/${category}/${title
          .toLowerCase()
          .replaceAll(" ", "-")}`}
        state={id}>
        {title}
      </Link>
      <HotPriceStyled>
        <span>{countPrice(price)}</span>
        <span>
          {countSalePrice(price, discountPercentage)}
        </span>
      </HotPriceStyled>
      <p>{description.slice(0, 150) + "..."}</p>
      <HotButtons id={id} />
    </HotStyled>
  );
};

Hot.propTypes = {
  hot: PropTypes.shape({
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    reviews: PropTypes.array.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number.isRequired,
  }).isRequired,
};
