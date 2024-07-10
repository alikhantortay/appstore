import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

export const PageListStyled = styled.ul`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  gap: 8px;

  a {
    display: flex;
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }
`;

export const ArrowPageLinkStyled = styled(Link)`
  margin: 0 12px;
  border: 2px solid var(--primary);
  color: var(--primary);
  transition: background-color 200ms ease, color 200ms ease;

  &:hover {
    background-color: var(--primary);
    color: var(--textSecondary);
  }

  svg {
    width: 24px;
    height: 24px;

    ${(props) =>
      props.$left && "transform: rotate(180deg);"}
  }
`;

export const PageLinkStyled = styled(NavLink)`
  border: 1px solid var(--disabledSecondary);
  transition: border-color 200ms ease;
  color: var(--title);

  &:hover {
    border-color: var(--primary);
  }

  ${(props) =>
    props.$active &&
    "border-color: var(--primary);background-color: var(--primary);color: var(--textSecondary);"}
`;
