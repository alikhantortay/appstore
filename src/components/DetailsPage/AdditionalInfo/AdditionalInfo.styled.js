import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const AdditionalInfoStyled = styled.div`
  padding: 60px;

  ${mediaQueries("mobile")`padding: 20px;`}

  > ul {
    > :not(:last-child) {
      margin-bottom: 12px;
    }

    p {
      display: inline;

      font-weight: 600;
      color: var(--title);
    }

    a {
      font-weight: 600;

      text-transform: capitalize;
      color: var(--title);
      transition: color 200ms ease;

      &:hover {
        color: var(--price);
      }
    }

    span {
      font-weight: 400px;
      color: var(--textThird);
    }
  }
`;

export const AdditionalTagsStyled = styled.ul`
  display: inline-flex;
  gap: 8px;

  a {
    display: block;
    padding: 5px 11px;
    border: 1px solid var(--disabledSecondary);
    border-radius: 2px;
    transition: border-color 200ms ease,
      background-color 200ms ease, color 200ms ease;
    color: var(--title);

    &:hover {
      border-color: var(--primary);
      background-color: #fff3eb;
      color: var(--title);
    }
  }
`;
