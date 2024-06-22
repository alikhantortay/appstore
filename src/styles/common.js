import styled from "styled-components";

export const TitleStyled = styled.h2`
  text-align: ${(props) =>
    props.$left ? "left" : "center"};
  font-size: 32px;
  font-weight: 600;
  line-height: 1.25;
  color: var(--title);
`;

export const ItemListStyled = styled.ul`
  display: flex;
  grid-area: list;
  flex-wrap: wrap;
  gap: 16px;
`;

export const ErrorMessageStyled = styled.p`
  padding: 20px;

  font-size: 18px;
  font-weight: 600;
  color: var(--primary);
`;
