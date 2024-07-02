import PropTypes from "prop-types";
import { useShopList } from "../../../../hooks/useShopList";

import { ReactComponent as HeartIcon } from "../../../../icons/Heart.svg";
import { ReactComponent as CartIcon } from "../../../../icons/CartSecond.svg";
import { ReactComponent as EyeIcon } from "../../../../icons/Eye.svg";

import { CartBtnStyled } from "../../../../styles/common";
import {
  HotButtonsStyled,
  SideButtonStyled,
} from "./HotButtons.styled";

export const HotButtons = ({ id }) => {
  const { checkIsInList, modifyList } = useShopList();

  return (
    <HotButtonsStyled>
      <SideButtonStyled
        type="button"
        onClick={() => modifyList(id, "wishlist")}
        $inList={checkIsInList(id, "wishlist")}>
        <HeartIcon />
      </SideButtonStyled>
      <CartBtnStyled
        type="button"
        onClick={() => modifyList(id, "cart")}
        $inList={checkIsInList(id, "cart")}>
        <CartIcon />
        ADD TO CART
      </CartBtnStyled>
      <SideButtonStyled
        type="button"
        onClick={() => modifyList(id, "compare")}
        $inList={checkIsInList(id, "compare")}>
        <EyeIcon />
      </SideButtonStyled>
    </HotButtonsStyled>
  );
};

HotButtons.propTypes = { id: PropTypes.number };
