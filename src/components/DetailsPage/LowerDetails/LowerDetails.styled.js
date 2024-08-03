import styled from "styled-components";
import { Link } from "react-router-dom";

export const LowerDetailsStyled = styled.div`
  border: 1px solid var(--disabledSecondary);
  border-radius: 4px;

  > ul {
    display: flex;
    border-bottom: 1px solid var(--disabledSecondary);
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
`;

export const InfoLinkStyled = styled(Link)`
  display: block;
  padding: 18px 20px;

  text-transform: uppercase;
  font-weight: 500;
  color: var(--textThird);

  ${(props) =>
    props.$active &&
    "border-bottom: 3px solid var(--primary);"}
  &.active {
    border-bottom: 3px solid var(--primary);
  }
`;
