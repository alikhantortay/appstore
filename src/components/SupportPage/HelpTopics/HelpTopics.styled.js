import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const HelpTopicsStyled = styled.div`
  padding: 72px 0;
`;

export const TopicsListStyled = styled.ul`
  display: flex;
  margin-top: 40px;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 24px;

  ${mediaQueries("tablet")`justify-content: center;`}

  button {
    display: flex;
    width: 312px;
    height: 80px;
    padding: 24px;
    align-items: center;
    gap: 16px;
    border: 2px solid rgb(255, 231, 214);
    border-radius: 4px;
    background-color: transparent;
    transition: border-color 250ms ease;

    font-weight: 500;
    color: var(--title);

    ${mediaQueries("mobile")`width: 280px;`}

    &:hover,
    &:focus {
      cursor: pointer;
      border-color: var(--primary);
    }
  }
`;
