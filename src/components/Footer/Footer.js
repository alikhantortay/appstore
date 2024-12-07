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
            <span>AppStore</span>
          </FooterLogoLinkStyled>
          <FooterAddressStyled>
            <p>Контакты поддержки:</p>
            <a href="tel:+77777777">(+7) 777-7777</a>
            <p>
            17 Абая ул., Алматы Казахстан
            </p>
            <a href="mailto:appstore@gmail.com">
            appstore@gmail.com
            </a>
          </FooterAddressStyled>
        </div>

        {width > 1023 && (
          <FooterLinksStyled>
            <h2>Все категории</h2>
            <ul>
              {categories
                .slice(0, 6)
                .map(({ slug, name }) => {
                  return (
                    <li key={slug}>
                      <NavLink to={`/`}> {/* shop/${slug} */}
                        {name}
                      </NavLink>
                    </li>
                  );
                })}
            </ul>
            <AllCategoryLinkStyled to="/"> {/* shop */}
              Показать все продукты
              <ArrowRight />
            </AllCategoryLinkStyled>
          </FooterLinksStyled>
        )}

        {width > 1199 && (
          <FooterLinksStyled>
            <h2>Быстрые ссылки</h2>
            <ul>
              <li>
                <NavLink to="/">Купить сейчас</NavLink> {/*shop */}
              </li>
              <li>
                <NavLink to="/">Корзина</NavLink> {/* cart*/}
              </li>
              <li>
                <NavLink to="/">Список желаний</NavLink> {/* wishlist*/}
              </li>
              <li>
                <NavLink to="/">Служба поддержки</NavLink> {/*support */}
              </li>
            </ul>
          </FooterLinksStyled>
        )}

      </Container>
      
    </FooterStyled>
  );
};
