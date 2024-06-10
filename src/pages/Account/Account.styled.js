import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const AccountPageStyled = styled.div`
  padding: 100px 0;

  ${mediaQueries("tablet")`padding: 50px 0;`}
  ${mediaQueries("mobile")`padding: 25px 0;`}
`;

export const AccountWrapper = styled.div`
  max-width: 424px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--disabledSecondary);
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);

  > a {
    display: inline-block;
    position: relative;
    width: 50%;
    padding: 16px 0;
    transition: color 250ms ease;

    text-align: center;
    font-size: 20px;
    font-weight: 600;
    line-height: 1.4;
    color: var(--text);

    &:hover {
      color: var(--title);
    }

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: var(--disabledSecondary);
    }

    &.active {
      color: var(--title);

      &::after {
        height: 3px;
        background-color: var(--primary);
      }
    }
  }
`;

export const FormWrapper = styled.div`
  padding: 24px 32px 32px;
`;

export const GoogleBtnStyled = styled.button`
  display: flex;
  position: relative;
  width: 100%;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--disabledSecondary);
  border-radius: 2px;
  background-color: #fff;
  transition: border-color 250ms ease, color 250ms ease;

  color: var(--text);

  &:hover {
    cursor: pointer;
    border-color: var(--price);
    color: var(--price);
  }

  svg {
    position: absolute;
    top: 11px;
    left: 15px;
  }
`;
