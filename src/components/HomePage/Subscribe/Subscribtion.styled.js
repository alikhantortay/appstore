import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";
import { LogInBtnStyled } from "../../../styles/authUI.styled";

export const SubscribtionStyled = styled.div`
  padding: 72px 0;
  background-color: var(--secondary);

  text-align: center;
  color: #ffffffb3;

  h2 {
    color: var(--textSecondary);
  }

  p {
    display: block;
    margin: 12px auto 32px auto;
    max-width: 536px;

    font-size: 16px;
    line-height: 1.5;
  }
`;

export const SubscriptionFormStyled = styled.form`
  display: flex;
  max-width: 624px;
  margin: 0 auto;
  padding: 12px;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 16px;
  border-radius: 3px;

  box-shadow: 0px 12px 24px 0px #ffffff1f;
  background-color: #fff;

  input {
    width: 424px;
    height: 48px;
    padding: 0 16px;
    border: none;

    font-size: 16px;

    ${mediaQueries("mobile")`width: 100%;`}

    &:focus {
      outline-color: var(--primary);
    }
  }
`;

export const SubscribeBtnStyled = styled(LogInBtnStyled)`
  margin: 0;
  width: 160px;
`;

export const SubscribedMessageStyled = styled.span`
  font-size: 32px;
  color: var(--warning);
`;

export const CompaniesListStyled = styled.ul`
  display: flex;
  margin-top: 32px;
  justify-content: center;
  gap: 48px;

  ${mediaQueries("mobile")`flex-direction: column;`}

  a {
    color: inherit;
    transition: 250ms ease;

    &:hover,
    &:focus {
      color: #fff;
    }
  }

  svg {
    width: 72px;
    height: 72px;
  }
`;
