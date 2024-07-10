import styled from "styled-components";
import { ShopLinkStyled } from "../../ShopLink/ShopLink.styled";
import {
  ArticlePriceStyled,
  ArticleStyled,
} from "../../../styles/common";
import { mediaQueries } from "../../../styles/mediaQueries";

export const ShopArticleStyled = styled(ArticleStyled)`
  width: 312px;
  border: 4px solid #ffe7d6;
  background-color: #fff;

  ${mediaQueries("tablet")`width: 200px;`}
  ${mediaQueries("mobile")`width: 100%;`}

  h3 {
    font-size: 32px;
    font-weight: 900;

    svg {
      width: 32px;
      height: 32px;
    }

    span {
      display: block;

      font-size: 14px;
      letter-spacing: 1px;
      color: var(--danger);
    }
  }

  p {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: var(--title);
  }
`;

export const ShopArticlePriceStyled = styled(
  ArticlePriceStyled,
)`
  span {
    background-color: #f3de6d;
  }
`;

export const ShopArticleLinkStyled = styled(ShopLinkStyled)`
  margin-top: 12px;

  background-color: #fff;
  color: var(--primary);

  &:hover,
  &:focus {
    background-color: var(--primary);
    color: #fff;
  }
`;
