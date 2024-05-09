import { Link } from "react-router-dom";
import styled from "styled-components";
import { mediaQueries } from "../../styles/mediaQueries";

export const FooterStyled = styled.footer`
  background-color: var(--title);
  color: #adb7bc;

  > div {
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
    line-height: 24px;
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

    font-size: 14px;
    line-height: 1.43;
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
    display: block;
    padding: 6px 0;
    transition: color 250ms ease;

    font-size: 14px;
    font-weight: 500;
    line-height: 1.43;

    &:hover,
    &:focus {
      color: var(--textSecondary);
    }
  }

  ul {
    margin-top: 12px;

    a {
      color: #929fa5;

      &.active::before {
        content: "";
        display: inline-block;
        margin-right: 8px;
        vertical-align: middle;
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
      font-size: 14px;
      font-weight: 600;
      line-height: 1.43;
    }
  }
`;

export const FooterTagsStyled = styled.div`
  ul {
    display: flex;
    max-width: 320px;
    margin-top: 18px;
    flex-wrap: wrap;
    gap: 8px;

    a {
      display: inline-block;
      padding: 6px 12px;
      border: 1px solid rgb(48, 54, 57);
      border-radius: 2px;
      transition: background-color 250ms ease,
        border-color 250ms ease;

      font-size: 14px;
      font-weight: 500;
      line-height: 1.43;
      color: var(--textSecondary);

      &:hover {
        background-color: #303639;
        border-color: #fff;
      }
    }
  }
`;

export const LowerFooterStyled = styled.div`
  padding: 24px 0;
  border-top: 1px solid var(--disabled);

  p {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 14px;
    line-height: 1.43;
  }
`;
