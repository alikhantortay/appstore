import PropTypes from "prop-types";

import { ReactComponent as ArrowRight } from "../../icons/ArrowRight.svg";

import { ShopLinkStyled } from "./ShopLink.styled";

export const ShopLink = ({ to, big = false }) => {
  return (
    <ShopLinkStyled
      to={to.toLowerCase().replaceAll(" ", "-")}
      $big={big}>
      SHOP NOW
      <ArrowRight />
    </ShopLinkStyled>
  );
};

ShopLink.propTypes = {
  to: PropTypes.string.isRequired,
  big: PropTypes.bool,
};
