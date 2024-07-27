import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { usePrice } from "../../../hooks/usePrice";

import { OtherDealStyled } from "./OtherDeals.styled";

export const OtherDeal = ({ items, title }) => {
  const { countSalePrice } = usePrice();

  return (
    <OtherDealStyled>
      <h2>{title}</h2>
      <ul>
        {items.map(
          ({
            id,
            title,
            category,
            thumbnail,
            price,
            discountPercentage,
          }) => {
            return (
              <li key={id}>
                <Link
                  to={`shop/${category}/${title
                    .toLowerCase()
                    .replaceAll(" ", "-")}`}
                  state={id}>
                  <img
                    src={thumbnail}
                    alt={title}
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                  <div>
                    <h3>{title}</h3>
                    <span>
                      {countSalePrice(
                        price,
                        discountPercentage,
                      )}
                    </span>
                  </div>
                </Link>
              </li>
            );
          },
        )}
      </ul>
    </OtherDealStyled>
  );
};

OtherDeal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  title: PropTypes.string.isRequired,
};
