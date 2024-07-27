import styled from "styled-components";

export const ShareBtnsStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  p {
    color: var(--text);
  }

  ul {
    display: flex;
    align-items: center;
    gap: 12px;

    a {
      color: var(--textThird);
      transition: color 250ms ease;

      &:hover {
        color: var(--primary);
      }
    }
  }
`;
