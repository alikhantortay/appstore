import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";
import { Link } from "react-router-dom";

export const WishlistHeadingsStyled = styled.ul`
  display: flex;
  padding: 10px 24px;
  justify-content: space-between;
  border-top: 1px solid var(--disabledSecondary);
  border-bottom: 1px solid var(--disabledSecondary);
  background-color: #f2f4f5;

  ${mediaQueries("mobile")`display: none;`}

  li {
    min-width: 200px;

    ${mediaQueries("tablet")`min-width: 80px;`}
  }

  > :first-child {
    width: 579px;

    ${mediaQueries("tablet")`width: 220px;`}
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

export const WishlistStyled = styled.ul`
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

    > :first-child {
      width: 579px;

      ${mediaQueries("tablet")`width: 220px;`}
    }
  }
`;

export const WishlistLinkStyled = styled(Link)`
  gap: 16px;
  transition: color 250ms ease;
  color: var(--text);

  ${mediaQueries("mobile")`width: 100%;
  flex-wrap: wrap;
  
  img {width: 100%;}`}

  &:hover {
    color: var(--primary);
  }
`;

export const WishlistBtnsStyled = styled.div`
  gap: 24px;

  ${mediaQueries("mobile")`width: 100%;
  justify-content: space-between;`}
`;
