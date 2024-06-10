import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const BestDealsStyled = styled.div`
  padding: 72px 0;
  ${mediaQueries("mobile")`padding: 36px 0;`}
`;

export const TitlesStyled = styled.div`
  display: flex;
  margin-bottom: 24px;
  align-items: center;

  ${mediaQueries("mobile")`flex-direction: column;
  gap: 12px;`}

  h2 {
    font-size: 24px;
    line-height: 1.33;
    color: var(--title);
  }

  p {
    margin: 0 12px 0 24px;
  }

  span {
    padding: 10px 12px;
    border-radius: 2px;
    background-color: #f3de6d;

    line-height: 1;
    color: var(--title);
  }

  a {
    display: flex;
    margin-left: auto;
    align-items: center;
    gap: 8px;

    font-weight: 700;
    color: var(--price);
  }
`;

export const BestDealsGridContainer = styled.ul`
  display: grid;
  grid-template-areas:
    "hot item"
    "hot item";
  grid-template-columns: 328px 248px 248px 248px 248px;
  outline: 1px solid #e4e7e9;

  ${mediaQueries("tablet")`
    grid-template-columns: 50%;`}
  ${mediaQueries("mobile")`display: block;`}
`;

export const BestDealsItemStyled = styled.li`
  position: relative;
  padding: 16px;
  outline: 1px solid #e4e7e9;

  a {
    display: block;
    margin-bottom: 8px;
    height: 40px;

    color: var(--title);
    transition: color 250ms ease;

    &:hover {
      color: var(--primary);
    }
  }

  ${mediaQueries("mobile")`img {width: 100%;
  margin-bottom: 12px; }`}
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
