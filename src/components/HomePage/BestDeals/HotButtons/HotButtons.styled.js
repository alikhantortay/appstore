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
  background-color: #ffe7d6;
  color: var(--title);

  &:hover {
    cursor: pointer;
    background-color: var(--primary);
    color: #fff;
  }

  svg {
    width: 24px;
    height: 24px;

    ${({ $inList }) => {
      return $inList && "fill: var(--danger);";
    }}
  }
`;
