import styled from "styled-components";

export const ForgetPasswordStyled = styled.div`
  padding-top: 8px;
  h2 {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--title);
  }

  button {
    margin-top: 24px;
  }
`;

export const ForgetPasswordUpperTextStyled = styled.p`
  margin: 12px 0 24px;

  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.43;
  color: #5f6c72;
`;

export const AuthLinksStyled = styled.ul`
  margin: 24px 0 48px;

  p {
    display: inline;

    font-size: 14px;
    font-weight: 400;
    line-height: 1.43;
    color: #5f6c72;
  }

  a {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    color: var(--price);
  }
`;

export const ForgetPasswordLowerTextStyled = styled.p`
  position: relative;

  font-size: 14px;
  font-weight: 400;
  line-height: 1.43;
  color: var(--text);

  a {
    color: var(--primary);
  }

  &::before {
    content: "";
    position: absolute;
    top: -24px;
    width: 100%;
    height: 1px;
    background-color: var(--disabledSecondary);
  }
`;
