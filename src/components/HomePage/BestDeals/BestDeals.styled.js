import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const BestDealsStyled = styled.div`
  padding: 72px 0;
  ${mediaQueries("mobile")`padding: 36px 0;`}
`;

export const BestDealsTitlesStyled = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;

  ${mediaQueries("mobile")`flex-direction: column;
  gap: 12px;`}

  h2 {
    font-size: 24px;
    line-height: 1.33;
    color: var(--title);
  }

  p {
    margin: 0 12px 0 24px;
  }

  span {
    padding: 10px 12px;
    border-radius: 2px;
    background-color: #f3de6d;

    line-height: 1;
    color: var(--title);
  }

  a {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 8px;

    font-weight: 700;
    color: var(--price);
  }
`;

export const BestDealsGridContainer = styled.ul`
  display: grid;
  grid-template-areas:
    "hot item"
    "hot item";
  grid-template-columns: 328px 248px 248px 248px 248px;
  outline: 1px solid #e4e7e9;

  ${mediaQueries("tablet")`
    grid-template-columns: 50%;`}
  ${mediaQueries(
    "mobile",
  )`display: block;grid-template-columns: 100%;`}
`;
