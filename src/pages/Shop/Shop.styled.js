import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const ShopStyled = styled.div`
  padding: 40px 0 72px;

  > div {
    display: flex;
    gap: 24px;

    ${mediaQueries("mobile")`flex-wrap: wrap;`}
  }
`;

export const ShopTitleStyled = styled.div`
  display: flex;
  margin-bottom: 24px;
  padding: 7px 24px;
  border-radius: 4px;
  align-items: center;
  gap: 20px;
  background-color: #f2f4f5;

  ${mediaQueries("mobile")`flex-wrap: wrap;`}

  h2 {
    text-transform: capitalize;
    color: var(--title);
  }

  p {
    margin-left: auto;
    color: #5f6c72;

    span {
      color: var(--title);
      font-weight: 700;
    }
  }

  a {
    display: flex;
    align-items: center;
    gap: 8px;

    font-weight: 700;
    color: var(--price);
  }
`;
