import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const FeaturedStyled = styled.div`
  padding: 72px 0;

  > div {
    display: grid;
    grid-template-areas:
      "article title"
      "article list";
    gap: 24px;

    ${mediaQueries("mobile")`display: block;`}
  }
`;

export const FeaturedArticleStyled = styled.article`
  display: inline-block;
  grid-area: article;
  border-radius: 3px;
  background-color: #f3de6d;

  ${mediaQueries("mobile")`
  width: 100%;`}

  > div {
    padding: 36px 0 16px;
    text-align: center;

    ${mediaQueries("mobile")`padding: 16px 0;`}

    h2 {
      margin: 16px 0;
    }
  }

  img {
    margin: 0 auto 0 auto;

    ${mediaQueries("tablet")`width: 380px;`}
    ${mediaQueries("mobile")`width: 100%;`}
  }
`;

export const UpperSpanStyled = styled.span`
  font-weight: 600;
  color: #be4646;
`;

export const FeaturedTextStyled = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: var(--text);
`;

export const FeaturedEndsStyled = styled.p`
  margin: 40px 0 48px;

  font-weight: 500;

  span {
    padding: 6px 12px;
    border-radius: 2px;
    background-color: #fff;

    font-weight: 600;
    color: var(--title);
  }
`;

export const FeaturedTitleStyled = styled.div`
  display: flex;
  align-items: center;

  ${mediaQueries("tablet")`margin: 16px 0;
  flex-direction: column;
  gap: 12px;`}

  h2 {
    font-size: 24px;
    line-height: 1.33;
    color: var(--title);
  }

  > a {
    display: flex;
    align-items: center;
    gap: 8px;

    font-weight: 700;
    color: var(--primary);
  }
`;

export const FeaturedLinksStyled = styled.ul`
  display: flex;
  margin: 0 16px 0 auto;

  ${mediaQueries("tablet")`margin: 0;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px;`}

  :first-child {
    a {
      border-bottom: 2px solid var(--primary);

      font-weight: 600;
      color: var(--title);

      &:hover {
        color: var(--title);
      }
    }
  }

  a {
    padding: 8px;
    color: #5f6c72;
    transition: color 200ms ease;

    &:hover {
      color: var(--primary);
    }
  }
`;
