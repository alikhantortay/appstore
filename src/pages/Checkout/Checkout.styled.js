import styled from "styled-components";
import { CartTotalsListStyled } from "../../components/CartPage/CartTotals/CartTotals.styled";
import { CartBtnStyled } from "../../components/CartBtn/CartBtn.styled";
import { mediaQueries } from "../../styles/mediaQueries";

export const CheckoutStyled = styled.div`
  width: 424px;
  margin: 0 auto;
  padding: 20px 24px 24px;
  border: 1px solid var(--disabledSecondary);
  border-radius: 4px;

  ${mediaQueries("mobile")`width: 100%;`}

  h2 {
    display: inline;

    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    color: var(--title);
  }

  > a {
    float: right;

    font-weight: 600;
    color: var(--price);

    &:hover {
      font-weight: 700;
    }
  }
`;

export const CheckoutListStyled = styled.ul`
  margin: 20px 0 24px;

  li {
    display: flex;
    align-items: center;

    &:not(:last-child) {
      margin-bottom: 16px;
    }

    img {
      margin-right: 16px;
      border: 1px solid #f5f5f5;
    }

    a {
      transition: color 250ms ease, font-weight 100ms linear;
      color: var(--title);

      &:hover,
      &:focus {
        color: var(--primary);
        font-weight: 600;
      }
    }
  }
`;

export const CheckoutTotalsListStyled = styled(
  CartTotalsListStyled,
)`
  padding-top: 0;
`;

export const CheckoutBtnStyled = styled(CartBtnStyled)`
  width: 100%;
`;

export const CheckoutMsgStyled = styled.p`
  padding-bottom: 8px;

  color: var(--primary);
  font-size: 18px;
  font-weight: 600;
`;
