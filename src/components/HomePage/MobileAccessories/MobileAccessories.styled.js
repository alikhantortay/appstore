import styled from "styled-components";
import { ShopLinkStyled } from "../../../styles/common";
import { mediaQueries } from "../../../styles/mediaQueries";

export const MobileAccessoriesStyled = styled.div`
  padding: 72px 0;

  > div {
    display: grid;
    grid-template-areas:
      "title pods"
      "list pods"
      "list sales";
    gap: 24px;

    ${mediaQueries("mobile")`display: block;`}

    li {
      max-width: 234px;

      ${mediaQueries("tablet")`
      max-width: none;
      width: 100%;`}
    }
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

export const AccessoriesPodsStyled = styled.div`
  grid-area: pods;
  width: 312px;
  padding: 32px;
  border-radius: 4px;
  background-color: #f7e99e;
  text-align: center;

  ${mediaQueries("mobile")`width: 100%;
  margin: 20px 0;
  padding: 32px 16px;`}

  img {
    margin-left: auto;
    margin-right: auto;
  }

  h3 {
    margin: 12px 0 8px;

    font-size: 26px;
    font-weight: 600;
    line-height: 32px;
    color: var(--title);
  }

  p {
    font-size: 16px;
    line-height: 24px;
    color: var(--text);

    span {
      display: inline-block;
      margin: 16px 0 24px 8px;
      padding: 6px 12px;
      border-radius: 3px;
      background-color: #fff;

      font-weight: 600;
      color: var(--title);
    }
  }

  a {
    width: 100%;
  }
`;

export const SummerSalesStyled = styled.div`
  grid-area: sales;
  width: 312px;
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
    line-height: 32px;
  }

  p {
    font-size: 18px;
    line-height: 24px;

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
