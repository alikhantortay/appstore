import { Link } from "react-router-dom";
import { OtherDealStyled } from "./OtherDeals.styled";
import { usePrice } from "../../../hooks/usePrice";

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
                  to={`shop/${category}/${title}`}
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
