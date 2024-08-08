import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";
import { Link } from "react-router-dom";

export const FooterStyled = styled.footer`
  background-color: var(--title);
  color: #adb7bc;

  > :first-child {
    display: flex;
    padding-top: 72px;
    padding-bottom: 72px;
    justify-content: space-between;

    ${mediaQueries("mobile")`
    padding-top: 40px;
    padding-bottom: 40px;
    flex-wrap: wrap;
    gap: 30px;`}
  }

  h2 {
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.5;
    color: var(--textSecondary);
  }
`;

export const FooterLogoLinkStyled = styled(Link)`
  display: flex;
  margin-bottom: 24px;
  align-items: center;
  gap: 8px;
  color: var(--primary);

  span {
    font-size: 32px;
    font-weight: 700;
    line-height: 1.25;
    color: var(--textSecondary);
  }
`;

export const FooterAddressStyled = styled.address`
  font-style: normal;

  :first-child {
    margin-bottom: 4px;
    color: var(--disabled);
  }

  :nth-child(2) {
    font-size: 18px;
    line-height: 1.33;
  }

  :nth-child(3) {
    margin: 12px 0;
  }

  a {
    font-weight: 500;
    color: var(--textSecondary);
    transition: color 250ms ease;

    &:hover,
    &:focus {
      color: var(--primary);
    }
  }
`;

export const FooterLinksStyled = styled.div`
  a {
    padding: 6px 0;
    transition: color 250ms ease;

    text-transform: capitalize;
    font-weight: 500;

    &:hover,
    &:focus {
      color: var(--textSecondary);
    }
  }

  ul {
    margin-top: 12px;

    a {
      display: block;
      color: #929fa5;

      &.active::before {
        content: "";
        display: inline-block;
        margin-right: 8px;
        vertical-align: 4px;
        width: 24px;
        height: 2px;
        border-radius: 8px;
        background-color: var(--warning);
      }
    }
  }
`;

export const AllCategoryLinkStyled = styled(Link)`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--warning);
`;

export const FooterAppLinksStyled = styled.div`
  > :nth-child(2) {
    margin: 18px 0 12px;
  }

  a {
    display: flex;
    padding: 16px 20px;
    border-radius: 3px;
    align-items: center;
    gap: 18px;
    background-color: #303639;
    color: var(--textSecondary);
    transition: color 250ms ease;

    &:hover,
    &:focus {
      color: var(--warning);
    }

    span {
      display: block;

      font-size: 11px;
      line-height: 1.18;
    }

    p {
      display: block;
      font-weight: 600;
    }
  }
`;

export const LowerFooterStyled = styled.div`
  padding: 24px 0;
  border-top: 1px solid var(--disabled);
  text-align: center;
`;
