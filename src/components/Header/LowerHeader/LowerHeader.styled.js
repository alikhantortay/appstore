import styled from "styled-components";

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

  p {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -2%;
    color: var(--textSecondary);
  }
`;
