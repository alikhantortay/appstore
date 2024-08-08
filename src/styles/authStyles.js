import styled from "styled-components";

export const AuthLabelStyled = styled.label`
  display: block;
  position: relative;
  margin-bottom: 16px;

  color: var(--title);

  input {
    width: 100%;
    height: 44px;
    margin-top: 8px;
    padding: 0 12px;
    border: 1px solid rgb(228, 231, 233);
    border-radius: 2px;
    background-color: transparent;

    &:focus {
      outline-color: var(--primary);
    }
  }

  a {
    float: right;
    padding: 0 4px;
    border-radius: 2px;
    transition: background-color 250ms ease;

    font-weight: 500;
    color: var(--price);

    &:hover,
    &:focus {
      background-color: var(--warningSecondary);
    }
  }

  button {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    height: 44px;
    padding: 0 16px;
    border: none;
    align-items: center;
    background-color: transparent;
    color: var(--title);
    transition: color 250ms ease;

    &:hover {
      cursor: pointer;
      color: var(--primary);
    }
  }
`;

export const LogInBtnStyled = styled.button`
  display: flex;
  margin-top: 20px;
  width: 100%;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: background-color 250ms ease, color 250ms ease;

  font-weight: 700;
  color: var(--textSecondary);

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: #fff;
    color: var(--primary);
  }
`;

export const AuthSeparator = styled.div`
  position: relative;
  margin: 24px 0 12px;

  line-height: 1;

  p {
    display: inline-block;
    position: relative;
    z-index: 2;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 8px;
    background-color: #fff;

    line-height: 1.43;
    color: var(--text);
  }

  &::before {
    content: "";
    position: absolute;
    z-index: 1;
    left: 0;
    top: 10px;
    width: 100%;
    height: 1px;
    background-color: var(--disabledSecondary);
  }
`;

export const AgreementStyled = styled.div`
  display: flex;
  margin: 16px 0 32px;
  gap: 8px;
  color: var(--text);

  div {
    position: relative;
    height: 20px;
    border-radius: 2px;
    background-color: var(--primary);

    input {
      position: relative;
      appearance: none;
      -webkit-appearance: none;
      z-index: 1;
      width: 20px;
      height: 20px;
      border: none;
    }

    svg {
      position: absolute;
      top: 3px;
      left: 3px;
    }
  }

  span {
    font-weight: 500;
    color: var(--price);

    &:hover {
      cursor: pointer;
    }
  }
`;
