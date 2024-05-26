import styled from "styled-components";
import bgImg from "../../../images/support.png";
import searchIcon from "../../../icons/MagnifyingGlassOrange.svg";
import { mediaQueries } from "../../../styles/mediaQueries";

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

  font-size: 14px;
  font-weight: 600;
  line-height: 1.43;
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
    margin-right: 0;
    margin-bottom: 12px;`}

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

    font-size: 14px;
    font-weight: 700;
    line-height: 1.43;
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
