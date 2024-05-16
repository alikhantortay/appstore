import styled from "styled-components";
import { mediaQueries } from "../../../../../../styles/mediaQueries";

export const UserModalStyled = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  z-index: 1;
  padding: 32px;
  border: 1px solid rgb(228, 231, 233);
  border-radius: 4px;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;

  ${mediaQueries("mobile")`padding: 24px 16px;`}
`;

export const UserModalTitleStyled = styled.h2`
  margin-bottom: 20px;

  font-size: 20px;
  font-weight: 600;
  line-height: 1.4;
  letter-spacing: 0%;
  text-align: center;
  color: var(--title);
`;

export const UserModalFormStyled = styled.form`
  label {
    display: block;
    position: relative;
    margin-bottom: 20px;

    font-size: 14px;
    line-height: 1.43;
    letter-spacing: 0%;
    color: var(--title);
    &:first-child {
      margin-bottom: 16px;
    }

    input {
      width: 360px;
      height: 44px;
      margin-top: 8px;
      padding: 0 12px;
      border: 1px solid rgb(228, 231, 233);
      border-radius: 2px;
      background-color: transparent;

      font-size: 18px;

      ${mediaQueries("tablet")`width: 300px;`}
      ${mediaQueries("mobile")`width: 248px;`}

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
      align-items: center;
      height: 44px;
      padding: 0 16px;
      border: none;
      color: var(--title);
      background-color: transparent;
      transition: color 250ms ease;

      &:hover {
        cursor: pointer;
        color: var(--primary);
      }
    }
  }
`;

export const LogInBtnStyled = styled.button`
  display: flex;
  width: 100%;
  padding: 0;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: color 250ms ease, background-color 250ms ease;

  font-size: 14px;
  font-weight: 700;
  line-height: 3.15;
  letter-spacing: 1.2%;
  color: var(--textSecondary);

  &:hover,
  &:focus {
    cursor: pointer;
    color: var(--primary);
    background-color: #fff;
  }
`;

export const UserModalSeparator = styled.div`
  position: relative;
  margin: 24px 0 12px;

  line-height: 1;

  p {
    display: inline-block;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    padding: 0 8px;
    background-color: #fff;

    font-size: 14px;
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

    background-color: var(--disabled);
  }
`;
