import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";
import { ArticleStyled } from "../../../styles/common";
import { ShopLinkStyled } from "../../ShopLink/ShopLink.styled";

export const MobileAccessoriesStyled = styled.div`
  padding: 72px 0;

  > div {
    display: grid;
    grid-template-areas:
      "title pods"
      "list pods"
      "list sales";
    grid-template-columns: auto 312px;
    align-items: start;
    gap: 24px;

    ${mediaQueries(
      "tablet",
    )`grid-template-columns: auto 200px;`}
    ${mediaQueries("mobile")`display: block;`}
  }
`;

export const AccessoriesTitleStyled = styled.div`
  display: flex;
  grid-area: title;
  align-items: center;

  ${mediaQueries("mobile")`flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;`}

  h2 {
    font-size: 24px;
    line-height: 1.33;
    color: var(--title);
  }

  > a {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 8px;

    font-weight: 700;
    color: var(--primary);

    ${mediaQueries("mobile")`margin-left: 0;`}
  }
`;

export const AccessoriesPodsStyled = styled(ArticleStyled)`
  grid-area: pods;
  background-color: #f7e99e;

  ${mediaQueries("mobile")`
  margin: 20px 0;
`}

  p {
    font-size: 16px;
    color: var(--text);
  }
`;

export const SummerSalesStyled = styled.div`
  grid-area: sales;
  padding: 40px 24px;
  border-radius: 4px;
  background-color: #124261;

  text-align: center;
  color: var(--textSecondary);

  ${mediaQueries("mobile")`width: 100%;
  padding: 32px 16px;`}

  > span {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 2px;
    background-color: #ffffff1f;

    font-weight: 600;
  }

  h3 {
    margin: 12px 0;

    font-size: 28px;
    line-height: 1.14;
  }

  p {
    font-size: 18px;
    line-height: 1.33;

    span {
      font-weight: 600;
      color: var(--warning);
    }
  }
`;

export const SalesShopLinkStyled = styled(ShopLinkStyled)`
  width: 100%;
  margin-top: 24px;
  border: 1px solid var(--price);
  background-color: var(--price);

  &:hover,
  &:focus {
    color: var(--price);
  }
`;
