import styled from "styled-components";
import { mediaQueries } from "../../../styles/mediaQueries";

export const ContactUsStyled = styled.div`
  padding: 72px 0;
  background-color: #f2f4f5;
`;

export const ContactSpanStyled = styled.span`
  display: block;
  width: 122px;
  margin: 0 auto 16px auto;
  padding: 8px 16px;
  background-color: var(--price);

  font-weight: 600;
  color: var(--textSecondary);
`;

export const ContactLinksStyled = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;
  gap: 24px;

  ${mediaQueries("mobile")`flex-wrap: wrap;`}
`;

export const ContactLinkWrapper = styled.div`
  display: flex;
  padding: 32px;
  justify-content: space-between;
  gap: 24px;
  border-radius: 4px;
  box-shadow: 0px 24px 32px 0px rgba(25, 28, 31, 0.08);
  background: #fff;

  ${mediaQueries("tablet")`padding: 20px;`}
  ${mediaQueries("mobile")`padding: 20px 8px;
  gap: 12px;`}

  h3 {
    font-size: 18px;
    font-weight: 600;
    line-height: 1.33;
    color: var(--title);
  }

  p {
    margin: 8px 0 16px;
    width: 352px;

    color: var(--text);

    ${mediaQueries("tablet")`width: 180px;`}
  }

  span {
    display: block;

    font-size: 24px;
    line-height: 1.33;
    color: var(--title);

    ${mediaQueries("tablet")`font-size: 18px;`}
  }

  a {
    display: inline-block;
    margin-top: 24px;
    padding: 12px 24px;
    border: none;
    border-radius: 2px;
    background-color: ${(props) =>
      props.$call ? "var(--price)" : "var(--ok)"};
    transition: background-color 200ms ease;

    font-weight: 700;
    color: var(--textSecondary);

    &:hover,
    &:focus {
      background-color: var(--primary);
    }

    svg {
      vertical-align: bottom;
      margin-left: 8px;
    }
  }
`;
