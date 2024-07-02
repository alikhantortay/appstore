import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const CartGridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "cart totals"
    "cart coupon";
  align-items: start;
  grid-template-columns: 872px auto;
  gap: 24px;

  ${mediaQueries("tablet")`grid-template-areas:
    "cart cart"
    "coupon totals";
    grid-template-columns: auto auto;`}

  ${mediaQueries("mobile")`grid-template-areas:
    "cart"
    "coupon"
    "totals";
    column-gap: 0;`}

  > :first-child {
    grid-area: cart;
  }

  > :nth-child(2) {
    grid-area: totals;
  }

  > :last-child {
    grid-area: coupon;
  }
`;
