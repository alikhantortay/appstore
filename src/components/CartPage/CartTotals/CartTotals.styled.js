import styled from "styled-components";
import { ShopLinkStyled } from "../../ShopLink/ShopLink.styled";

export const CartTotalsStyled = styled.div`
  padding: 20px 24px 24px;
  border: 1px solid var(--disabledSecondary);
  border-radius: 4px;

  h2 {
    font-weight: 500;
    line-height: 1.33;
    color: var(--title);
  }
`;

export const CartTotalsListStyled = styled.ul`
  padding: 20px 0;
  border-bottom: 1px solid var(--disabledSecondary);

  > :not(:last-child) {
    margin-bottom: 12px;
  }

  li {
    display: flex;
    justify-content: space-between;

    p {
      color: #5f6c72;
    }

    span {
      font-weight: 700;
      color: var(--title);
    }
  }
`;

export const CartTotalStyled = styled.div`
  display: flex;
  margin: 16px 0 24px;
  justify-content: space-between;

  font-weight: 700;
`;

export const OrderLinkStyled = styled(ShopLinkStyled)`
  display: flex;
`;
