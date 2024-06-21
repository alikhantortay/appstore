import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const HeroGridContainer = styled.div`
  display: grid;
  grid-template-areas:
    "xbox phone"
    "xbox pods";

  padding: 24px 0;
  gap: 24px;

  ${mediaQueries("tablet")`grid-template-areas:
    "xbox xbox"
    "phone pods";
    grid-template-columns: 50%;`}

  ${mediaQueries("mobile")`display: block;`}
`;

export const XBoxStyled = styled.div`
  display: flex;
  grid-area: xbox;
  padding: 56px;
  justify-content: space-between;
  align-items: flex-end;
  background-color: #f2f4f5;
  border-radius: 6px;

  ${mediaQueries("tablet")`padding: 32px;`}
  ${mediaQueries("mobile")`flex-wrap: wrap;
  a {margin-bottom: 20px;}`}
`;

export const XBoxTextStyled = styled.div`
  > span {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.43;
    color: var(--titleSecondary);

    &::before {
      content: "";
      display: inline-block;
      margin-right: 8px;
      vertical-align: 4px;
      width: 24px;
      height: 2px;
      border-radius: 8px;
      background-color: var(--titleSecondary);
    }
  }

  h2 {
    margin: 4px 0 16px;

    font-size: 48px;
    font-weight: 700;
    line-height: 1.17;
    color: var(--title);
  }

  p {
    max-width: 356px;

    font-size: 18px;
    line-height: 1.33;
    color: var(--text);
  }
`;

export const CirclesStyled = styled.div`
  display: flex;
  margin-top: 90px;
  gap: 8px;

  ${mediaQueries("mobile")`display: none;`}

  :first-child {
    background-color: var(--title);
  }

  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #adb7bc;
  }
`;

export const XBoxImgStyled = styled.div`
  position: relative;

  > span {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--price);

    font-size: 22px;
    font-weight: 600;
    line-height: 1;
    color: #fff;
  }
`;

export const PhoneSaleStyled = styled.div`
  display: flex;
  height: 248px;
  overflow: hidden;
  grid-area: phone;
  padding: 46px 0 0 40px;
  justify-content: space-between;
  border-radius: 6px;
  background-color: var(--title);

  ${mediaQueries("tablet")`padding: 26px 0 0 26px;`}
  ${mediaQueries("mobile")`
  margin: 20px 0 20px;
  height: 328px;
  flex-wrap: wrap;`}
`;

export const PhoneTextStyled = styled.div`
  span {
    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;
    color: var(--warning);
  }

  h2 {
    width: 160px;
    margin: 5px 0 18px;

    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: var(--textSecondary);
  }
`;

export const PhoneImgStyled = styled.div`
  position: relative;

  span {
    position: absolute;
    top: 12px;
    right: 32px;
    padding: 8px 16px;
    border-radius: 2px;
    background-color: #efd33d;

    font-weight: 700;
    text-align: center;
    color: #141414;
  }
`;

export const PodsStyled = styled.div`
  display: flex;
  height: 248px;
  grid-area: pods;
  padding: 0 40px 0 32px;
  justify-content: space-between;
  align-items: center;
  border-radius: 6px;
  background-color: #f2f4f5;

  ${mediaQueries("tablet")`padding: 0 20px;`}
  ${mediaQueries("mobile")`height: 328px;
  flex-wrap: wrap;`}

  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 1.33;
    color: var(--title);
  }

  span {
    display: block;
    margin: 12px 0 20px;

    font-weight: 700;
    color: var(--price);
  }
`;
