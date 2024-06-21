import { Link } from "react-router-dom";
import styled from "styled-components";

export const TitleStyled = styled.h2`
  text-align: ${(props) =>
    props.$left ? "left" : "center"};
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--title);
`;

export const ItemListStyled = styled.ul`
  display: flex;
  grid-area: list;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ShopLinkStyled = styled(Link)`
  display: inline-flex;
  height: 48px;
  padding: 0 24px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: background-color 200ms ease, color 200ms ease;

  font-weight: 700;
  color: var(--textSecondary);

  &:hover,
  &:focus {
    background-color: #fff;
    color: var(--primary);
  }
`;

export const BigShopLinkStyled = styled(ShopLinkStyled)`
  height: 56px;
  padding: 0 32px;
  gap: 12px;
  font-size: 16px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ErrorMessageStyled = styled.p`
  padding: 20px;

  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
`;
