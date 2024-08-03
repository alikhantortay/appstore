import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const ReviewsStyled = styled.div`
  padding: 40px;
  ${mediaQueries("mobile")`padding: 20px;`}

  li {
    display: flex;
    padding: 12px 0;
    border-top: 1px solid var(--disabledSecondary);
    flex-wrap: wrap;
    align-items: center;
    gap: 12px 8px;

    a {
      display: flex;
      align-items: center;
      gap: 8px;
      transition: color 250ms ease;

      font-weight: 600;
      color: var(--title);

      ${mediaQueries("mobile")`width: 100%;`}

      &:hover {
        color: var(--primary);
      }
    }

    svg {
      width: 24px;
      height: 24px;
      color: var(--primary);
    }

    p {
      width: 100%;
      padding: 0 40px;
      color: var(--textThird);
    }
  }
`;
