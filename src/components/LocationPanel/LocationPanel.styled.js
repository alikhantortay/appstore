import { Link } from "react-router-dom";
import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const LocationPanelStyled = styled.div`
  padding: 26px 0;
  background-color: #f2f4f5;
  color: #5f6c72;

  ${mediaQueries("mobile")`padding: 16px 0;`}
`;

export const LocationsStyled = styled.ul`
  display: flex;
  align-items: center;
  gap: 8px;

  li {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`;

export const CategoryLinkStyled = styled(Link)`
  transition: color 250ms ease;

  text-transform: capitalize;
  color: #5f6c72;

  ${(props) => {
    return props.$current && "color: var(--price);";
  }}

  &:hover {
    color: var(--title);
  }
`;
