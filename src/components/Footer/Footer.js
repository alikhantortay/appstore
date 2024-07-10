import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/shop/selectors";
import { useWindowWidth } from "../../hooks/useWindowWidth";

import { Container } from "../Container/Container";
import { Tags } from "../Tags/Tags";
import { ReactComponent as Logo } from "../../icons/header/logo.svg";
import { ReactComponent as ArrowRight } from "../../icons/ArrowRight.svg";
import { ReactComponent as GPlayIcon } from "../../icons/GooglePlay.svg";
import { ReactComponent as AppleIcon } from "../../icons/AppStore.svg";

import {
  AllCategoryLinkStyled,
  FooterAddressStyled,
  FooterAppLinksStyled,
  FooterLinksStyled,
  FooterLogoLinkStyled,
  FooterStyled,
  LowerFooterStyled,
} from "./Footer.styled";

export const Footer = () => {
  const width = useWindowWidth();
  const categories = useSelector(selectCategories);

  return (
    <FooterStyled>
      <Container>
        <div>
          <FooterLogoLinkStyled to="/">
            <Logo />
            <span>CLICON</span>
          </FooterLogoLinkStyled>
          <FooterAddressStyled>
            <p>Customer Supports:</p>
            <a href="tel:6295550129">(629) 555-0129</a>
            <p>
              4517 Washington Ave.
              <br />
              Manchester, Kentucky 39495
            </p>
            <a href="mailto:info@kinbo.com">
              info@kinbo.com
            </a>
          </FooterAddressStyled>
        </div>

        {width > 1023 && (
          <FooterLinksStyled>
            <h2>Top Category</h2>
            <ul>
              {categories
                .slice(0, 6)
                .map(({ slug, name }) => {
                  return (
                    <li key={slug}>
                      <NavLink to={`/shop/${slug}`}>
                        {name}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
            <AllCategoryLinkStyled to="/shop">
              Browse All Product
              <ArrowRight />
            </AllCategoryLinkStyled>
          </FooterLinksStyled>
        )}

        {width > 1199 && (
          <FooterLinksStyled>
            <h2>Quick links</h2>
            <ul>
              <li>
                <NavLink to="/shop">Shop Product</NavLink>
              </li>
              <li>
                <NavLink to="/cart">Shoping Cart</NavLink>
              </li>
              <li>
                <NavLink to="/wishlist">Wishlist</NavLink>
              </li>
              <li>
                <NavLink to="/compare">Compare</NavLink>
              </li>
              <li>
                <NavLink to="/about">About Us</NavLink>
              </li>
            </ul>
          </FooterLinksStyled>
        )}

        <FooterAppLinksStyled>
          <h2>Download App</h2>
          <a
            href="https://play.google.com/"
            rel="noreferrer"
            target="_blank">
            <GPlayIcon />
            <div>
              <span>Get it now</span>
              <p>Google Play</p>
            </div>
          </a>
          <a
            href="https://www.apple.com/app-store/"
            rel="noreferrer"
            target="_blank">
            <AppleIcon />
            <div>
              <span>Get it now</span>
              <p>App Store</p>
            </div>
          </a>
        </FooterAppLinksStyled>

        <Tags footer />
      </Container>
      <LowerFooterStyled>
        <p>
          Kinbo - eCommerce Template © 2021. Design by
          Templatecookie
        </p>
      </LowerFooterStyled>
    </FooterStyled>
  );
};
