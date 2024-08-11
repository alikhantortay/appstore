import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const OtherDealsStyled = styled.div`
  padding: 72px 0;

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    row-gap: 24px;

    ${mediaQueries("mobile")`flex-direction: column;`}
  }
`;

export const OtherDealStyled = styled.div`
  h2 {
    font-size: 16px;
    line-height: 1.5;
    color: var(--title);
  }

  ul {
    margin-top: 16px;

    > :not(:last-child) {
      margin-bottom: 16px;
    }

    a {
      display: flex;
      width: 314px;
      padding: 12px;
      gap: 12px;
      border: 1px solid var(--disabledSecondary);
      border-radius: 3px;

      ${mediaQueries("mobile")`width: auto;`}

      &:hover {
        h3 {
          color: var(--primary);
        }
      }

      h3 {
        height: 40px;
        margin-bottom: 8px;
        transition: color 250ms ease;

        color: var(--title);
      }

      span {
        font-weight: 600;
        color: var(--price);
      }
    }
  }
`;
