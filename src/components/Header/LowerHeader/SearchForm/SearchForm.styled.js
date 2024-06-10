import styled from "styled-components";
import { mediaQueries } from "../../../../styles/mediaQueries";
import { Link } from "react-router-dom";

export const SearchFormWrapper = styled.div`
  position: relative;
  width: 646px;

  ${mediaQueries("tablet")`max-width: 300px;`}
  ${mediaQueries("mobile")`margin-right: 12px;`}
`;

export const SearchFormStyled = styled.form`
  display: flex;
  padding: 10px 20px;
  border-radius: 2px;
  align-items: center;
  background-color: #fff;

  ${mediaQueries("mobile")`
  padding: 10px;`}

  input {
    flex-grow: 1;
    padding: 0;
    border: none;
    outline: none;

    ${mediaQueries("mobile")`
  width: 52px;`}
  }

  button {
    height: 28px;
    padding: 4px;
    border: none;
    background-color: transparent;
    transition: color 250ms ease;

    &:hover,
    &:focus {
      cursor: pointer;
      color: var(--secondary);
    }
  }
`;

export const SearchResultsStyled = styled.div`
  position: absolute;
  top: 52px;
  z-index: 1;
  width: 100%;
  padding: 16px 30px;
  border: 1px solid rgb(228, 231, 233);
  border-radius: 4px;
  box-shadow: 0px 8px 40px 0px rgba(0, 0, 0, 0.12);
  background-color: #fff;

  li {
    &:hover,
    &:focus {
      background-color: var(--warning);
    }

    a {
      display: flex;
      padding: 4px 8px;
      justify-content: space-between;
      border-radius: 4px;
      color: var(--title);
      transition: background-color 250ms ease;
    }
  }
`;

export const ShowMoreStyled = styled(Link)`
  display: inline-block;
  margin-top: 6px;
  padding: 2px 16px;
  color: var(--secondary);
  transition: background-color 250ms ease;

  :hover,
  :focus {
    color: var(--warning);
  }
`;
