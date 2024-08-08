import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";
import { Link } from "react-router-dom";

export const LowerHeaderStyled = styled.div`
  padding: 20px 0;
  background-color: var(--secondary);

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const HeadLogoLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary);
  ${mediaQueries("mobile")`margin-right: auto;`}

  font-size: 32px;
  font-weight: 700;
  line-height: 1.25;
  color: var(--textSecondary);
  ${mediaQueries("mobile")`font-size: 18px;`}

  svg {
    color: var(--primary);
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  ${mediaQueries("mobile")`
  gap: 12px;`}
`;
