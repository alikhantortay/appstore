import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const DescriptionStyled = styled.div`
  display: flex;
  padding: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;

  ${mediaQueries("mobile")`padding: 20px;`}

  h2 {
    margin-bottom: 12px;

    font-size: 16px;
    line-height: 1.5;
    color: var(--title);
  }
`;

export const DescriptionTextStyled = styled.div`
  width: 40%;

  @media screen and (max-width: 1048px) {
    width: 100%;
  }

  p {
    color: var(--textThird);
  }
`;

export const DescriptionFeaturesStyled = styled.div`
  ul {
    > :not(:last-child) {
      margin-bottom: 8px;
    }

    li {
      display: flex;
      align-items: center;
      gap: 12px;

      p {
        color: var(--title);
      }
    }
  }
`;

export const DescriptionShippingInfoStyled = styled.div`
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -24px;
    width: 1px;
    height: 100%;
    background-color: var(--disabledSecondary);

    ${mediaQueries("mobile")`display: none;`}
  }

  ul {
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
