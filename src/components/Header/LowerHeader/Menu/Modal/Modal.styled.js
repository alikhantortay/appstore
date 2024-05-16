import { Link } from "react-router-dom";
import styled from "styled-components";
import { mediaQueries } from "../../../../../styles/mediaQueries";

export const ModalStyled = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  z-index: 1;
  border: 1px solid rgb(228, 231, 233);
  border-radius: 4px;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;

  @media screen and (max-width: 767px) {
    right: ${(props) =>
      props.$wishlist ? "-55px" : "-99px"};
  }
`;

export const ModalTitleStyled = styled.h2`
  padding: 16px 24px;

  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--title);

  span {
    color: var(--text);
  }
`;

export const ModalListStyled = styled.ul`
  width: 376px;
  padding: 20px 24px;

  border-top: 1px solid rgb(228, 231, 233);
  border-bottom: 1px solid rgb(228, 231, 233);

  ${mediaQueries("tablet")`width: 373px;`}
  ${mediaQueries("mobile")`width: 300px;`}

  li:not(:last-child) {
    margin-bottom: 16px;
  }

  li {
    display: flex;

    align-items: center;

    img {
      margin-right: 16px;
      border: 1px solid rgb(228, 231, 233);
    }

    button {
      margin-left: auto;
      width: 20px;
      height: 20px;
      padding: 2px;
      border: none;
      border-radius: 2px;
      color: var(--disabled);
      background-color: transparent;
      transition: color 250ms ease,
        background-color 250ms ease;

      &:hover,
      &:focus {
        cursor: pointer;
        background-color: var(--primary);
        color: var(--textSecondary);
      }
    }
  }
`;

export const ModalItemTextStyled = styled.div`
  a {
    transition: color 250ms ease, font-weight 100ms linear;

    font-size: 14px;
    font-weight: 400;
    line-height: 1.43;
    color: var(--title);

    &:hover,
    &:focus {
      color: var(--secondary);
      font-weight: 600;
    }
  }
`;

export const CartModalPriceStyled = styled.p`
  font-size: 14px;
  line-height: 1.43;
  color: var(--text);

  span {
    font-weight: 600;
    color: var(--price);
  }
`;

export const WishlistModalPriceStyled = styled.span`
  display: block;

  font-weight: 600;
  color: var(--price);
`;

export const ModalLowerStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 24px;

  font-size: 14px;
  line-height: 1.43;
  color: var(--text);

  span {
    margin-bottom: 20px;

    font-weight: 500;
    color: var(--title);
  }
`;

export const ModalLinkStyled = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--primary);
  border-radius: 2px;
  transition: color 250ms ease, background-color 250ms ease;

  font-size: 14px;
  font-weight: 700;
  line-height: 3.15;
  letter-spacing: 1.2%;
  color: var(--primary);

  &:hover,
  &:focus {
    color: var(--textSecondary);
    background-color: var(--primary);
  }
`;
