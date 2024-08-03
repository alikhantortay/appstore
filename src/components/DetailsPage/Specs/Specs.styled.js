import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const SpecsStyled = styled.div`
  padding: 60px;
  ${mediaQueries("mobile")`padding: 20px;`}

  ul {
    ${mediaQueries("tablet")`text-align: center;`}

    > :not(:last-child) {
      margin-bottom: 12px;
    }

    p {
      color: var(--textThird);

      span {
        font-weight: 600;
        color: var(--title);
      }
    }
  }
`;
