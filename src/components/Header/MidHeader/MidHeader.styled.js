import styled from "styled-components";

export const MidHeaderStyled = styled.div`
  padding: 16px 0;
  box-shadow: inset 0px -1px 0px 0px rgba(255, 255, 255, 0.16);
  background-color: var(--secondary);

  > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
    color: var(--textSecondary);
  }
`;

export const WelcomeTextStyled = styled.p`
  margin-right: auto;
`;

export const FollowUsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ul::after {
    content: "";
    margin-left: 16px;
    width: 1px;
    height: 28px;
    background-color: #ffffff29;
  }

  ul {
    display: flex;
    align-items: center;
    gap: 8px;

    a {
      display: flex;
      width: 20px;
      height: 20px;
      align-items: center;
      justify-content: center;
      color: var(--textSecondary);

      svg {
        transition: color 250ms ease;
      }

      :hover,
      :focus {
        color: #ebc80c;
        transition: color 250ms ease;
      }
    }
  }

  ul::after {
    content: "";
    margin-left: 16px;
    width: 1px;
    height: 28px;
    background-color: #ffffff29;
  }
`;
