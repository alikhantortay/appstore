import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";
import { Link } from "react-router-dom";
import img from "../../images/404.png";

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
  background: no-repeat url(${img});

  text-align: center;

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
  border: 2px solid #ffe7d6;
  border-radius: 2px;
  background-color: var(--textSecondary);
  transition: color 250ms ease, background-color 250ms ease;

  font-weight: 700;
  color: var(--primary);

  &:hover,
  &:focus {
    cursor: pointer;
    background-color: var(--primary);
    color: var(--textSecondary);
  }
`;

export const GoBackLinkStyled = styled(HomeLinkStyled)`
  margin-right: 16px;
  border-color: var(--primary);
  background-color: var(--primary);
  color: var(--textSecondary);

  ${mediaQueries("mobile")`margin: 0 0 16px 0;`}

  &:hover,
  &:focus {
    background-color: var(--textSecondary);
    color: var(--primary);
  }

  svg {
    transform: rotate(180deg);
  }
`;
