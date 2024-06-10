import styled from "styled-components";

export const CategoriesStyled = styled.div`
  position: absolute;
  z-index: 1;
  top: 60px;
  left: 0;
  padding: 12px 0;
  border-radius: 3px;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;

  a {
    display: block;
    width: 240px;
    padding: 8px 16px;
    transition: color 200ms ease,
      background-color 200ms ease, font-weight 100ms ease;

    text-transform: capitalize;
    color: var(--text);

    &:hover,
    &:focus {
      color: var(--title);
      background-color: #f2f4f5;

      font-weight: 500;
    }
  }
`;
