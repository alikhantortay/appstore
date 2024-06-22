import { Link } from "react-router-dom";
import styled from "styled-components";

export const ShopLinkStyled = styled(Link)`
  display: inline-flex;
  height: ${(props) => (props.$big ? "56px" : "48px")};
  padding: 0 ${(props) => (props.$big ? "32px" : "24px")};
  align-items: center;
  justify-content: center;
  gap: ${(props) => (props.$big ? "12px" : "8px")};
  border: 1px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: background-color 200ms ease, color 200ms ease;

  font-weight: 700;
  color: var(--textSecondary);
  ${(props) =>
    props.$big &&
    "font-size: 16px;svg { width: 24px;height: 24px;} "};

  &:hover,
  &:focus {
    background-color: #fff;
    color: var(--primary);
  }
`;
