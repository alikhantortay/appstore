import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const BigDealStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 72px;
  background-color: #ffe7d6;

  ${mediaQueries("tablet")`padding: 18px 36px;`}
  ${mediaQueries("mobile")`padding: 9px 18px;
  flex-wrap: wrap;`}
`;

export const BigDealTextStyled = styled.div`
  width: 424px;

  ${mediaQueries("tablet")`width: 50%;`}
  ${mediaQueries("mobile")`width: 100%;`}

  span {
    display: inline-block;
    margin-bottom: 12px;
    padding: 6px 12px;
    border-radius: 2px;
    background-color: var(--price);

    font-weight: 600;
    color: var(--textSecondary);
  }

  h2 {
    font-size: 48px;
    font-weight: 600;
    line-height: 56px;
  }

  p {
    margin: 22px 0;

    font-size: 24px;
    line-height: 32px;
    color: var(--title);
  }
`;

export const BigDealImgWrapper = styled.div`
  position: relative;

  > span {
    display: flex;
    position: absolute;
    top: 90px;
    left: 30px;
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    border: 6px solid #fff;
    border-radius: 50%;
    background-color: #ffcead;

    font-size: 18px;
    font-weight: 600;
    line-height: 1;
    color: var(--title);
  }

  ${mediaQueries("mobile")`img {width: 100%;} `}
`;
