import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";
import {
  ListPriceStyled,
  ListWrapper,
} from "../../styles/listStyles";

import { Link } from "react-router-dom";
import { SideButtonStyled } from "../../components/HomePage/BestDeals/HotButtons/HotButtons.styled";

export const CompareWrapper = styled(ListWrapper)`
  display: flex;
  align-items: flex-end;
`;

export const CompareHeadingsStyled = styled.ul`
  width: 25%;
  min-width: 180px;
  padding: 32px 0 12px;

  ${mediaQueries("mobile")`display: none;`}

  > :nth-child(odd) {
    background-color: #f2f4f5;
  }

  li {
    padding: 12px 24px;

    ${mediaQueries("tablet")`padding: 12px;`}

    p {
      color: var(--text);
    }
  }
`;

export const CompareListStyled = styled.ul`
  display: flex;
  flex-grow: 1;
  border-left: 1px solid var(--disabledSecondary);

  > :not(:last-child) {
    border-right: 1px solid var(--disabledSecondary);
  }

  li {
    flex-grow: 1;
    padding: 32px 0 12px;
    color: var(--title);

    ${mediaQueries(
      "mobile",
    )`> :nth-last-child(2) {height: 84px;}
    > :last-child, :nth-child(6), :nth-child(7) {height: 64px;}`}

    > * {
      padding: 12px 24px;
      ${mediaQueries("tablet")`padding: 12px;`}
      ${mediaQueries("mobile")`padding: 12px 6px;`}
    }

    > :nth-child(odd) + :not(a) {
      background-color: #f2f4f5;
    }

    > button {
      display: block;
      margin: 0 auto;
      padding: 0;
    }
  }
`;

export const CompareLinkStyled = styled(Link)`
  display: block;
  margin: 0 auto;

  img {
    margin: 0 auto 16px auto;
  }

  p {
    max-width: 272px;
    height: 64px;

    font-size: 16px;
    line-height: 24px;
    color: var(--title);
  }
`;

export const CompareBtnsStyled = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;

  > :first-child {
    width: auto;
    max-width: 212px;
    flex-grow: 1;

    @media screen and (max-width: 1119px) {
      width: 48px;
      flex-grow: 0;
    }
  }
`;

export const CompareWishlistBtnStyled = styled(
  SideButtonStyled,
)`
  padding: 10px;
  border: 2px solid #ffe7d6;
  background-color: #fff;
  color: var(--primary);

  &:disabled {
    border-color: var(--disabledSecondary);
    color: #adb7bc;
  }

  &:hover {
    &:disabled {
      cursor: default;
      background-color: #fff;
    }
  }
`;

export const CompareStarRatingStyled = styled.div`
  display: flex;
  gap: 6px;

  p {
    color: #77878f;
  }

  ${mediaQueries("mobile")`svg {width: 10px;}`}
`;

export const ComparePriceStyled = styled(ListPriceStyled)`
  font-size: 18px;
  font-weight: 600;
  line-height: 20.02px;
  color: var(--price);

  span {
    margin-right: 4px;
  }
`;
