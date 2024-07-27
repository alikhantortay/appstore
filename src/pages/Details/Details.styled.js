import { Link } from "react-router-dom";
import styled from "styled-components";

export const DetailsWrapper = styled.div`
  display: flex;
  padding: 32px 0 72px;
  gap: 56px;
`;

export const UpperDetailsStyled = styled.div`
  h1 {
    margin: 8px 0 16px;

    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    color: var(--title);
  }
`;

export const DetailsStarRatingStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    font-weight: 600;
    color: var(--title);
  }

  p {
    color: var(--textThird);
  }
`;

export const ProductInfoStyled = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 8px 24px;

  p {
    width: 312px;
    text-transform: capitalize;
    color: var(--textThird);

    span {
      font-weight: 600;
      color: var(--title);
    }

    &:nth-child(3) {
      span {
        color: ${({ $inStock }) =>
          $inStock ? "var(--ok);" : "var(--danger);"};
      }
    }
  }
`;

export const DetailsPriceStyled = styled.div`
  display: flex;
  margin: 25px 0;
  align-items: center;

  font-size: 24px;
  font-weight: 600;
  line-height: 1.33;
  color: var(--price);

  p {
    margin: 0 12px 0 4px;

    text-decoration-line: line-through;
    font-size: 18px;
    font-weight: 400;
    color: #77878f;
  }

  span {
    padding: 5px 10px;
    border-radius: 2px;
    background-color: #efd33d;

    font-size: 14px;
    font-weight: 600;
    line-height: 1.43;
    color: var(--title);
  }
`;

export const DetailsBtnsStyled = styled.div`
  display: flex;
  padding: 24px 0;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 24px 16px;

  border-top: 1px solid var(--disabledSecondary);
`;

export const DetailsBuyLinkStyled = styled(Link)`
  display: flex;
  width: 164px;
  height: 56px;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--primary);
  border-radius: 3px;
  transition: background-color 250ms ease, color 250ms ease;

  font-size: 16px;
  font-weight: 700;
  color: var(--primary);

  &:hover,
  &:focus {
    background-color: var(--primary);
    color: var(--textSecondary);
  }
`;

export const DetailsListBtnsStyled = styled.div`
  display: flex;
  gap: 24px;

  button {
    display: flex;
    align-items: center;
    gap: 6px;
    background-color: transparent;
    border: none;

    color: var(--text);

    &:hover {
      cursor: pointer;

      svg {
        fill: var(--primary);
      }
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const DetailsCardsStyled = styled.div`
  padding: 20px;
  border: 1px solid var(--disabledSecondary);
  border-radius: 3px;

  p {
    margin-bottom: 12px;
    color: var(--tilte);
  }
`;
