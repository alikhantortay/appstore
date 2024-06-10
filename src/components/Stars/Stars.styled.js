import styled from "styled-components";

export const StarsStyled = styled.span`
  display: inline-block;
  height: 20px;
  color: ${(props) => {
    return props.$bestDeals ? "#EFD33D" : "var(--primary)";
  }};
`;
