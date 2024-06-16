import styled from "styled-components";
import { mediaQueries } from "../../../../styles/mediaQueries";

export const HotStyled = styled.li`
  position: relative;
  grid-area: hot;
  padding: 24px;

  ${mediaQueries("mobile")`padding: 18px 8px;`}

  a {
    transition: color 250ms ease;
    color: var(--title);

    &:hover {
      color: var(--primary);
    }
  }

  > p {
    margin-bottom: 20px;
    color: #5f6c72;
  }
`;

export const HotWarningsStyled = styled.div`
  display: block;
  position: absolute;
  top: 16px;
  left: 16px;

  span {
    padding: 5px 10px;
    border-radius: 2px;
    background-color: var(--danger);

    font-size: 12px;
    font-weight: 600;
    line-height: 1.33;
    color: var(--textSecondary);
  }

  :first-child {
    display: block;
    margin-bottom: 8px;
    background-color: #efd33d;
    color: var(--title);
  }
`;

export const HotStarRatingStyled = styled.div`
  display: flex;
  margin: 24px 0 16px;
  align-items: center;
  gap: 4px;

  p {
    color: #77878f;
  }
`;

export const HotPriceStyled = styled.div`
  margin: 16px 0;

  :first-child {
    margin-right: 4px;

    text-decoration-line: line-through;
    color: #adb7bc;
  }

  :last-child {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.33;
    color: var(--price);
  }
`;
