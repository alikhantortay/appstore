import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCart,
  selectCompare,
  selectWishlist,
} from "../../../../redux/shop/selectors";
import { handleShopBtnClick } from "../../../../shopListFns";

import { ReactComponent as HeartIcon } from "../../../../icons/Heart.svg";
import { ReactComponent as CartIcon } from "../../../../icons/CartSecond.svg";
import { ReactComponent as EyeIcon } from "../../../../icons/Eye.svg";

import {
  CenterButtonStyled,
  HotButtonsStyled,
  SideButtonStyled,
} from "./HotButtons.styled";

export const HotButtons = ({ id }) => {
  const isInCart = useSelector(selectCart).some((item) => {
    return item.id === id;
  });
  const isInWishlist =
    useSelector(selectWishlist).includes(id);
  const isInCompare =
    useSelector(selectCompare).includes(id);
  const dispatch = useDispatch();

  return (
    <HotButtonsStyled>
      <SideButtonStyled
        type="button"
        onClick={() =>
          handleShopBtnClick(id, "wishlist", dispatch)
        }
        $inList={isInWishlist}>
        <HeartIcon />
      </SideButtonStyled>
      <CenterButtonStyled
        type="button"
        onClick={() =>
          handleShopBtnClick(id, "cart", dispatch)
        }
        $inList={isInCart}>
        <CartIcon />
        ADD TO CART
      </CenterButtonStyled>
      <SideButtonStyled
        type="button"
        onClick={() =>
          handleShopBtnClick(id, "compare", dispatch)
        }
        $inList={isInCompare}>
        <EyeIcon />
      </SideButtonStyled>
    </HotButtonsStyled>
  );
};

HotButtons.propTypes = { id: PropTypes.number };
