import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const NavHeaderStyled = styled.div`
  padding: 16px 0;

  ${mediaQueries("mobile")`padding: 12px 0`}
`;

export const NavStyled = styled.nav`
  display: inline-flex;
  position: relative;
  align-items: center;
  gap: 12px 24px;

  > a {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 2px;
    border-radius: 4px;
    transition: background-color 200ms ease;

    font-size: 14px;
    line-height: 1.43;
    text-align: left;
    color: var(--text);

    &:hover {
      background-color: var(--warningSecondary);
    }
  }
`;

export const CategoryBtnStyled = styled.button`
  display: flex;
  width: 154px;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: none;
  border-radius: 2px;

  font-size: 14px;
  font-weight: 500;
  line-height: 1.43;
  color: var(--title);
  transition: color 200ms ease, background-color 200ms ease;
  ${({ $isOpen }) =>
    $isOpen &&
    "background-color: var(--primary);color: var(--textSecondary);svg{transform: rotate(-180deg);}"}

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: var(--primary);
    color: var(--textSecondary);
  }

  svg {
    transition: transform 200ms linear;
  }
`;

export const HeaderTelStyled = styled.a`
  display: flex;
  float: right;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  transition: background-color 200ms ease;

  font-size: 18px;
  line-height: 1.33;
  color: var(--title);

  ${mediaQueries("mobile")`display: none;`}

  &:hover,
  &:focus {
    background-color: var(--warningSecondary);
  }
`;
