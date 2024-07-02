import styled from "styled-components";
import { CartBtnStyled } from "../../../styles/common";

export const CouponCodeStyled = styled.div`
  border: 1px solid var(--disabledSecondary);

  h2 {
    padding: 20px 24px;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.33;
    color: var(--title);
  }

  form {
    padding: 24px;

    input {
      width: 100%;
      height: 44px;
      margin-bottom: 16px;
      padding: 0 16px;
      border: 1px solid var(--disabledSecondary);
      border-radius: 4px;

      &:focus {
        outline-color: #2da5f3;
      }
    }
  }
`;

export const CouponBtnStyled = styled(CartBtnStyled)`
  border-color: #2da5f3;
  background-color: #2da5f3;

  &:hover {
    color: #2da5f3;
  }
`;
