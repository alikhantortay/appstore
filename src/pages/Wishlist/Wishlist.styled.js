import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";
import { Link } from "react-router-dom";

export const WishlistStyled = styled.div`
  padding: 72px 0;
`;

export const WishlistWrapper = styled.div`
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

export const HeadingsListStyled = styled.ul`
  display: flex;
  padding: 10px 24px;
  justify-content: space-between;
  border-top: 1px solid var(--disabledSecondary);
  border-bottom: 1px solid var(--disabledSecondary);
  background-color: #f2f4f5;

  li {
    min-width: 200px;

    ${mediaQueries("tablet")`min-width: 80px;`}
  }

  > :first-child {
    width: 579px;

    ${mediaQueries("tablet")`width: 240px;`}
  }

  > :last-child {
    width: 224px;
  }

  p {
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--text);
  }
`;

export const WishlistItemsStyled = styled.ul`
  padding: 24px;

  > :not(:last-child) {
    margin-bottom: 16px;
  }

  li {
    display: flex;
    justify-content: space-between;

    ${mediaQueries("mobile")`
     flex-wrap: wrap;
      gap: 16px;
      `}

    > * {
      display: flex;
      min-width: 200px;
      align-items: center;

      ${mediaQueries("tablet")`min-width: 80px;`}
    }
  }
`;

export const WishlistLinkStyled = styled(Link)`
  width: 579px;
  gap: 16px;
  transition: color 250ms ease;
  color: var(--text);

  ${mediaQueries("tablet")`width: 240px;`}
  ${mediaQueries("mobile")`width: 100%;
  flex-wrap: wrap;
  
  img {width: 100%;}`}

  &:hover {
    color: var(--primary);
  }
`;

export const WishlistPriceStyled = styled.p`
  gap: 4px;
  font-weight: 500;
  color: var(--title);

  span {
    text-decoration-line: line-through;
    font-weight: 400;
    color: #929fa5;
  }
`;

export const WishlistStockStatusStyled = styled.span`
  font-weight: 600;
  color: ${({ $inStock }) =>
    $inStock ? "var(--ok);" : "var(--danger);"};
`;

export const WishlistBtnsStyled = styled.div`
  gap: 24px;

  ${mediaQueries("mobile")`width: 100%;
  justify-content: space-between;`}
`;

export const WishlistRemoveBtnStyled = styled.button`
  height: 24px;
  padding: 0;
  border: none;
  background-color: #fff;
  color: var(--disabled);
  transition: color 200ms ease;

  &:hover,
  &:focus {
    cursor: pointer;
    color: var(--primary);
  }
`;
