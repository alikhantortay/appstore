import styled from "styled-components";

export const ListWrapper = styled.div`
  border: 1px solid var(--disabledSecondary);
  border-radius: 4px;

  h2 {
    padding: 20px 24px;

    font-size: 18px;
    font-weight: 500;
    line-height: 1.33;
    color: var(--title);
  }

  > p {
    padding: 24px;
    color: var(--text);
  }
`;

export const ListPriceStyled = styled.p`
  gap: 4px;
  font-weight: 500;
  color: var(--title);

  span {
    text-decoration-line: line-through;
    font-weight: 400;
    color: ${(props) =>
      props.$gray ? "var(--text)" : "#929fa5"};
  }
`;

export const ListStockStatusStyled = styled.span`
  display: block;

  font-weight: 600;
  color: ${({ $inStock }) =>
    $inStock ? "var(--ok);" : "var(--danger);"};
`;

export const ListRemoveBtnStyled = styled.button`
  height: 24px;
  padding: 0;
  border: none;
  background-color: #fff;
  color: var(--disabled);
  transition: color 200ms ease;

  &:hover,
  &:focus {
    cursor: pointer;
    color: var(--danger);
  }
`;
