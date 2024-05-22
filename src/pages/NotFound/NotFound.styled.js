import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

import img from "../../images/404.png";
import { Link } from "react-router-dom";

export const NotFoundWrapper = styled.div`
  padding: 8px 0 124px;
  ${mediaQueries("tablet")`padding-bottom: 60px;`}
  ${mediaQueries("mobile")`padding-bottom: 30px;`}
`;

export const NotFoundStyled = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 536px;
  padding-top: 500px;
  text-align: center;
  background-image: url(${img});
  background-position-x: center;
  background-repeat: no-repeat;

  ${mediaQueries("mobile")`width: 100%;
  a {width: 70%;}`}

  h1 {
    font-size: 36px;
    font-weight: 600;
    line-height: 1.22;
    color: var(--title);
  }

  p {
    margin: 24px 0;
    padding: 0 18px;
    color: var(--text);
  }
`;

export const HomeLinkStyled = styled(Link)`
  display: inline-flex;
  padding: 14px 24px;
  justify-content: center;
  gap: 8px;
  border: 2px solid rgb(255, 231, 214);
  border-radius: 2px;
  background-color: var(--textSecondary);
  transition: color 250ms ease, background-color 250ms ease;

  font-size: 14px;
  font-weight: 700;
  line-height: 1.43;
  color: var(--primary);

  &:hover,
  &:focus {
    cursor: pointer;
    color: var(--textSecondary);
    background-color: var(--primary);
  }
`;

export const GoBackLinkStyled = styled(HomeLinkStyled)`
  margin-right: 16px;
  border-color: var(--primary);
  background-color: var(--primary);
  color: var(--textSecondary);

  ${mediaQueries(
    "mobile",
  )`margin-right: 0; margin-bottom: 12px;`}

  &:hover,
  &:focus {
    color: var(--primary);
    background-color: var(--textSecondary);
  }

  svg {
    transform: rotate(180deg);
  }
`;
