import PropTypes from "prop-types";
import { useShopList } from "../../../../hooks/useShopList";

import { ReactComponent as HeartIcon } from "../../../../icons/Heart.svg";
import { ReactComponent as EyeIcon } from "../../../../icons/Eye.svg";

import {
  HotButtonsStyled,
  SideButtonStyled,
} from "./HotButtons.styled";
import { CartBtn } from "../../../CartBtn/CartBtn";

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
      <CartBtn id={id} />
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
