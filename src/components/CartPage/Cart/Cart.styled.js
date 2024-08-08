import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";
import { WishlistHeadingsStyled } from "../../../pages/Wishlist/Wishlist.styled";

export const CartWrapper = styled.div`
  border: 1px solid var(--disabledSecondary);

  h2 {
    padding: 20px 24px;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.33;
    color: var(--title);
  }

  > p {
    padding: 24px;
    color: var(--text);
  }
`;

export const CartHeadingsStyled = styled(
  WishlistHeadingsStyled,
)`
  ${mediaQueries("mobile")`display: none;`}

  li {
    min-width: 80px;
  }

  > :first-child {
    width: 380px;

    ${mediaQueries("tablet")`width: 280px;`}
  }

  > :nth-child(2) {
    width: 88px;
  }

  > :nth-child(3) {
    width: 172px;
  }

  > :last-child {
    width: 112px;
  }
`;

export const CartStyled = styled.ul`
  padding: 24px;

  > :not(:last-child) {
    margin-bottom: 16px;
  }

  li {
    display: flex;
    justify-content: space-between;

    ${mediaQueries("mobile")`
    flex-wrap: wrap;
    gap: 12px;`}

    > * {
      display: flex;
      align-items: center;
    }

    > :first-child {
      width: 380px;

      ${mediaQueries("tablet")`width: 280px;`}
      ${mediaQueries("mobile")`width: 100%;`}
    }

    > :nth-child(2) {
      width: 88px;

      ${mediaQueries("mobile")`display: none;`}
    }

    > :nth-child(3) {
      width: 172px;
    }

    > :last-child {
      width: 112px;

      ${mediaQueries("mobile")`width: 40px;`}
    }
  }
`;

export const CartProductStyled = styled.div`
  gap: 12px;

  a {
    display: flex;
    align-items: center;
    gap: 12px;
    transition: color 250ms ease;
    color: var(--text);

    &:hover {
      color: var(--primary);
    }
  }
`;

export const QuantityStyled = styled.div`
  display: flex;
  padding: 0 16px;
  width: 148px;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid var(--disabledSecondary);
  border-radius: 3px;

  button {
    display: flex;
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;
    align-items: center;
    justify-content: center;
    transition: color 250ms ease;

    font-size: 24px;
    line-height: 1;
    color: var(--title);

    &:disabled {
      color: #929fa5;
    }

    &:hover {
      cursor: pointer;
      color: var(--danger);

      &:disabled {
        cursor: default;
        color: #929fa5;
      }
    }
  }

  input {
    width: 36px;
    padding: 0;
    border: none;

    text-align: center;
    font-size: 16px;
    line-height: 1.5;
    color: var(--text);

    &:focus {
      outline: none;
    }
  }
`;

export const CartBtnstyled = styled.div`
  display: flex;
  padding: 24px;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--disabledSecondary);

  a,
  button {
    display: flex;
    height: 48px;
    padding: 0 24px;
    align-items: center;
    gap: 8px;
    border: 2px solid #2da5f3;
    border-radius: 2px;
    background-color: transparent;
    transition: background-color 250ms ease,
      color 250ms ease;

    font-weight: 700;
    color: #2da5f3;

    svg {
      transform: rotate(180deg);
    }

    &:hover {
      cursor: pointer;
      background-color: #2da5f3;
      color: #fff;
    }
  }
`;
