import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const BenefitsStyled = styled.div`
  ul {
    display: flex;
    padding: 16px;
    justify-content: space-between;
    border: 1px solid #e4e7e9;
    border-radius: 6px;

    ${mediaQueries("tablet")`flex-wrap: wrap;`}

    > :not(:last-child)::after {
      content: "";
      position: absolute;
      top: 10px;
      right: -10%;
      width: 1px;
      height: 56px;
      background-color: #e4e7e9;

      ${mediaQueries("tablet")`display: none;`}
    }

    li {
      display: flex;
      position: relative;
      padding: 16px;
      gap: 16px;

      ${mediaQueries("tablet")`width: 40%;`}
      ${mediaQueries("mobile")`width: 100%;
      padding: 12px 0;`}

      h2 {
        text-transform: uppercase;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.43;
        color: var(--title);
      }

      p {
        width: 192px;
        color: #5f6c72;
      }
    }
  }
`;
