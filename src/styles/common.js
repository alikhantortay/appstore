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

export const CartButtonStyled = styled.button`
  display: flex;
  width: 176px;
  height: 48px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 1px solid var(--primary);
  background-color: var(--primary);

  font-weight: 700;
  line-height: 1;
  color: var(--textSecondary);

  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: var(--primary);

    svg {
      ${({ $inList }) => {
        return $inList && "fill: var(--primary);";
      }}
    }
  }

  svg {
    ${({ $inList }) => {
      return $inList && "fill: #fff;";
    }}
  }
`;
