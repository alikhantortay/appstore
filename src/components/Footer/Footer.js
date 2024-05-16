import { Link, NavLink } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/shop/selectors";

import { ReactComponent as Logo } from "../../icons/header/logo.svg";
import { ReactComponent as ArrowRight } from "../../icons/ArrowRight.svg";
import { ReactComponent as GPlayIcon } from "../../icons/GooglePlay.svg";
import { ReactComponent as AppleIcon } from "../../icons/AppStore.svg";

import { Container } from "../Container/Container";
import {
  AllCategoryLinkStyled,
  FooterAddressStyled,
  FooterAppLinksStyled,
  FooterLinksStyled,
  FooterLogoLinkStyled,
  FooterStyled,
  FooterTagsStyled,
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
              {categories.slice(0, 6).map((item) => {
                return (
                  <li key={item}>
                    <NavLink to={`/shop/${item}`}>
                      {item.replace("-", " ")}
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

        <FooterTagsStyled>
          <h2>Popular Tag</h2>
          <ul>
            <li>
              <Link to="/shop&q=game">Game</Link>
            </li>
            <li>
              <Link to="/shop&q=iphone">iPhone</Link>
            </li>
            <li>
              <Link to="/shop&q=tv">TV</Link>
            </li>
            <li>
              <Link to="/shop&q=asus+laptops">
                Asus Laptops
              </Link>
            </li>
            <li>
              <Link to="/shop&q=macbook">MacBook</Link>
            </li>
            <li>
              <Link to="/shop&q=ssd">SSD</Link>
            </li>
            <li>
              <Link to="/shop&q=graphic+card">
                Graphic Card
              </Link>
            </li>
            <li>
              <Link to="/shop&q=power+bank">
                Power Bank
              </Link>
            </li>
            <li>
              <Link to="/shop&q=smart+tv">Smart TV</Link>
            </li>
            <li>
              <Link to="/shop&q=speaker">Speaker</Link>
            </li>
            <li>
              <Link to="/shop&q=tablet">Tablet</Link>
            </li>
            <li>
              <Link to="/shop&q=microvawe">Microvawe</Link>
            </li>
            <li>
              <Link to="/shop&q=samsung">Samsung</Link>
            </li>
          </ul>
        </FooterTagsStyled>
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
