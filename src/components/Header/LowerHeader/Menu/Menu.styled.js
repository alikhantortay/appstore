import styled from "styled-components";

export const MenuStyled = styled.div`
  position: relative;

  > button {
    display: flex;
    padding: 0;
    border: none;
    color: var(--textSecondary);
    background-color: transparent;
    transition: color 200ms ease;

    &:hover,
    &:focus {
      cursor: pointer;
      color: var(--warning);
    }

    &::after {
      content: "${(props) => props.$quantity}";
      position: absolute;
      ${(props) =>
        props.$quantity < 1 && "transform: scale(0%);"};
      right: -4px;
      top: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      outline: 2px solid var(--secondary);
      background-color: var(--textSecondary);
      transition: transform 100ms ease;

      font-size: 12px;
      font-weight: 600;
      line-height: 1.68;
      color: var(--secondary);
    }
  }
`;
