import PropTypes from "prop-types";
import { useShopList } from "../../hooks/useShopList";

import { ReactComponent as CartIcon } from "../../icons/CartSecond.svg";

import { CartBtnStyled } from "./CartBtn.styled";

export const CartBtn = ({
  id,
  quantity = 1,
  big,
  disabled,
}) => {
  const { checkIsInList, modifyList } = useShopList();

  return (
    <CartBtnStyled
      type="button"
      onClick={() => modifyList(id, "cart", quantity)}
      $inList={checkIsInList(id, "cart")}
      $big={big}
      disabled={disabled}>
      <CartIcon />
      ADD TO CART
    </CartBtnStyled>
  );
};

CartBtn.propTypes = {
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number,
  big: PropTypes.bool,
  disabled: PropTypes.bool,
};
