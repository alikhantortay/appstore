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

export const ShopLinkStyled = styled(Link)`
  display: inline-flex;
  padding: 13px
    ${(props) => (props.$padding ? props.$padding : 24)}px;
  gap: 8px;
  border: 1px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: background-color 200ms ease, color 200ms ease;

  font-size: 14px;
  font-weight: 700;
  line-height: 1.43;
  color: var(--textSecondary);

  &:hover,
  &:focus {
    background-color: #fff;
    color: var(--primary);
  }
`;

export const ErrorMessageStyled = styled.p`
  font-size: 18px;
  color: var(--price);
`;
