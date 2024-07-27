import styled from "styled-components";

export const CartBtnStyled = styled.button`
  display: flex;
  width: ${(props) => (props.$big ? "310" : "176")}px;
  height: ${(props) => (props.$big ? "56" : "48")}px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 2px solid var(--primary);
  border-radius: 2px;
  background-color: var(--primary);
  transition: background-color 250ms ease, color 250ms ease;

  ${(props) => props.$big && `font-size: 16px`};
  font-weight: 700;
  line-height: 1;
  color: var(--textSecondary);

  svg {
    ${(props) =>
      props.$big && "width: 24px; height: 24px;"};

    ${({ $inList }) => {
      return $inList && "fill: #fff;";
    }}
  }

  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: var(--primary);

    svg {
      ${({ $inList }) => {
        return $inList && "fill: var(--primary);";
      }}
    }

    &:disabled {
      cursor: default;
      color: #fff;
    }
  }

  &:disabled {
    border-color: #adb7bc;
    background-color: #adb7bc;
  }
`;
