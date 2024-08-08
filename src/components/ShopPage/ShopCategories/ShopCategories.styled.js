import styled from "styled-components";

export const ShopCategoriesStyled = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid var(--disabledSecondary);

  h2 {
    margin-bottom: 16px;

    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--title);
  }

  ul {
    > :not(:last-child) {
      margin-bottom: 12px;
    }

    a {
      display: flex;
      align-items: center;
      gap: 8px;
      transition: font-weight 100ms ease, color 250ms ease;
      color: var(--text);

      &:hover,
      &.active {
        font-weight: 600;
        color: var(--title);
      }

      &.active {
        &::before {
          border: 6px solid var(--primary);
        }
      }

      &::before {
        content: "";
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 1px solid #c9cfd2;
        border-radius: 50%;
      }
    }
  }
`;
