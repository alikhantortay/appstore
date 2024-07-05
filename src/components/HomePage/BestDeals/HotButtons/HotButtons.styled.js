import styled from "styled-components";

export const HotButtonsStyled = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    border-radius: 2px;
    transition: background-color 200ms ease,
      color 200ms ease;
  }
`;

export const SideButtonStyled = styled.button`
  display: flex;
  padding: 12px;
  border: none;
  border-radius: 2px;
  background-color: #ffe7d6;
  color: var(--title);
  transition: background-color 200ms ease, color 250ms ease;

  &:hover {
    cursor: pointer;
    background-color: var(--primary);
    color: #fff;

    svg {
      ${({ $inList }) => {
        return $inList && "fill: #fff;";
      }}
    }
  }

  svg {
    width: 24px;
    height: 24px;

    ${({ $inList }) => {
      return $inList && "fill: var(--primary);";
    }}
  }
`;
