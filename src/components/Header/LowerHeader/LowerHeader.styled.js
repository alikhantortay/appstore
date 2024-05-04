import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const LowerHeaderStyled = styled.div`
  padding: 20px 0;
  background-color: var(--secondary);

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HeadLogoStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  ${mediaQueries("mobile")`margin-right: auto;`}

  span {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -2%;
    color: var(--textSecondary);
    ${mediaQueries("mobile")`font-size: 18px;`}
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  ${mediaQueries("mobile")`
  gap: 12px;`}
`;
