import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const ItemCardStyled = styled.div`
  position: relative;
  padding: 16px;
  outline: 1px solid #e4e7e9;
  border-radius: 3px;

  a {
    display: block;
    margin: 4px 0;
    width: 202px;
    height: 40px;

    color: var(--title);
    transition: color 250ms ease;

    &:hover {
      color: var(--primary);
    }
  }

  ${mediaQueries("mobile")`img {width: 100%;
  margin: 6px 0; }`}
`;

export const DiscountWarningStyled = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  padding: 5px 10px;
  border-radius: 2px;
  background-color: #efd33d;

  font-size: 12px;
  font-weight: 600;
  line-height: 1.33;
  color: var(--title);
`;

export const HotWarningStyled = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  z-index: 1;
  padding: 5px 10px;
  border-radius: 2px;
  background-color: var(--danger);

  font-size: 12px;
  font-weight: 600;
  line-height: 1.33;
  color: var(--textSecondary);
`;

export const OldPriceStyled = styled.span`
  margin-right: 4px;

  text-decoration-line: line-through;
  color: #adb7bc;
`;

export const PriceStyled = styled.span`
  font-weight: 600;
  color: var(--price);
`;

export const ImgWrapper = styled.div`
  position: relative;
  overflow: hidden;

  &:hover,
  &:focus {
    div {
      transform: translateY(-100%);
    }
  }
`;

export const HoverBtnsStyled = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: #00000033;
  transition: transform 300ms ease;

  button {
    display: flex;
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    color: var(--title);
    transition: background-color 250ms ease,
      color 250ms ease;

    &:hover {
      cursor: pointer;
      background-color: var(--primary);
      color: #fff;
    }

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const ListBtnStyled = styled.button`
  &:hover {
    svg {
      ${({ $inList }) => {
        return $inList && "fill: #fff;";
      }}
    }
  }

  svg {
    ${({ $inList }) => {
      return $inList && "fill: var(--primary);";
    }}
  }
`;

export const StarRatingStyled = styled.div`
  display: flex;
  margin: 16px 0 8px;
  align-items: center;
  gap: 4px;

  p {
    color: #77878f;
  }
`;
