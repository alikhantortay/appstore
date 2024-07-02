import PropTypes from "prop-types";
import { usePrice } from "../../../hooks/usePrice";

import { ReactComponent as ArrowIcon } from "../../../icons/ArrowRight.svg";

import {
  CartTotalStyled,
  CartTotalsListStyled,
  CartTotalsStyled,
  OrderLinkStyled,
} from "./CartTotals.styled";

export const CartTotals = ({ items }) => {
  const {
    countPrice,
    countTotalPrice,
    countTotalDiscount,
  } = usePrice();

  const totalPrice = countTotalPrice(items);

  return (
    <CartTotalsStyled>
      <h2>Cart Totals</h2>
      <CartTotalsListStyled>
        <li>
          <p>Sub-total</p>
          <span>{totalPrice}</span>
        </li>
        <li>
          <p>Shipping</p>
          <span>
            {totalPrice.length > 3 ? "Free" : countPrice(5)}
          </span>
        </li>
        <li>
          <p>Discount</p>
          <span>{countTotalDiscount(items)}</span>
        </li>
        <li>
          <p>Tax</p>
          <span>{countPrice(totalPrice.slice(1) / 5)}</span>
        </li>
      </CartTotalsListStyled>
      <CartTotalStyled>
        <p>Total</p>
        <span>
          {countPrice(
            Number(totalPrice.slice(1)) +
              totalPrice.slice(1) / 5,
          )}
        </span>
      </CartTotalStyled>
      <OrderLinkStyled to="/shopping-cart/checkout">
        PROCEED TO CHECKOUT
        <ArrowIcon />
      </OrderLinkStyled>
    </CartTotalsStyled>
  );
};

CartTotals.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      discountPercentage: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
