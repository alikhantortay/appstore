import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";
import searchIcon from "../../../icons/MagnifyingGlassOrange.svg";
import bgImg from "../../../images/support.png";

export const HelpStyled = styled.div`
  border-bottom: 1px solid var(--disabledSecondary);

  > div {
    padding-top: 72px;
    padding-bottom: 72px;
    background: url(${bgImg}) no-repeat center right;
  }
`;

export const HelpSpanStyled = styled.span`
  display: inline-block;
  margin-bottom: 16px;
  padding: 8px 16px;
  background-color: #efd33d;

  font-weight: 600;
  color: var(--title);
`;

export const QuestionFormStyled = styled.form`
  display: inline-block;
  margin-top: 24px;
  padding: 12px;
  border: 1px solid rgb(228, 231, 233);
  border-radius: 4px;

  ${mediaQueries("mobile")`
  width: 100%;
  background-color: #fff; `}

  input {
    margin-right: 12px;
    width: 392px;
    height: 48px;
    padding: 12px 12px 12px 48px;
    border: none;
    background: url(${searchIcon}) no-repeat center left
      12px;

    ${mediaQueries("mobile")`width: 100%;
    margin-right: 0 0 12px 0;`}

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 12px 24px;
    border: 2px solid var(--primary);
    border-radius: 2px;
    background-color: var(--primary);
    transition: color 250ms ease,
      background-color 250ms ease;

    font-weight: 700;
    color: var(--textSecondary);

    ${mediaQueries("mobile")`display: block;
    margin: 0 auto;`}

    &:hover,
    &:focus {
      cursor: pointer;
      color: var(--primary);
      background-color: #fff;
    }
  }

  p {
    margin-top: 24px;

    text-align: center;
    color: var(--text);
  }
`;
