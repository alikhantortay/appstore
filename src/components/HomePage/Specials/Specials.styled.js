import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const SpecialsStyled = styled.div``;

export const SpecialsPodStyled = styled.div`
  display: inline-flex;
  margin-right: 24px;
  padding: 44px;
  flex-wrap: wrap;
  align-items: center;
  gap: 40px;
  border-radius: 4px;
  background-color: #f2f4f5;

  ${mediaQueries("tablet")`width: 100%;
  margin: 0 0 24px 0;
  justify-content: space-between;`}
`;

export const SpecialsPodTextStyled = styled.div`
  width: 280px;

  span {
    display: inline-block;
    margin-bottom: 8px;
    padding: 6px 12px;
    border-radius: 2px;
    background-color: var(--price);

    font-weight: 600;
    color: var(--textSecondary);
  }

  p {
    margin: 12px 0 20px;

    font-size: 16px;
    line-height: 24px;
    color: var(--text);
  }
`;

export const SpecialsPhoneStyled = styled.div`
  display: inline-flex;
  position: relative;
  overflow: hidden;
  flex-wrap: wrap;
  border-radius: 4px;
  background-color: #000;

  ${mediaQueries("tablet")`width: 100%;
  justify-content: space-between;`}

  img {
    transform: translate(20px, 40px);
  }
`;

export const SpecialPhoneTextStyled = styled(
  SpecialsPodTextStyled,
)`
  width: 336px;
  padding: 44px 12px 44px 44px;

  span {
    background-color: #efd33d;
    color: var(--title);
  }

  h2 {
    color: var(--textSecondary);
    line-height: 80px;
  }

  p {
    color: #adb7bc;
  }
`;

export const SpecialsPhonePriceStyled = styled.span`
  display: flex;
  position: absolute;
  top: 24px;
  right: 24px;
  width: 88px;
  height: 88px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--price);

  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: var(--textSecondary);
`;
