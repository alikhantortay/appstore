import { useWindowWidth } from "../../../hooks/useWindowWidth";

import { Container } from "../../Container/Container";
import { CartMenu } from "./Menu/CartMenu";
import { WishlistMenu } from "./Menu/WishlistMenu";
import { UserMenu } from "./Menu/UserMenu";
import { ReactComponent as Logo } from "../../../icons/header/logo.svg";
import { SearchForm } from "./SearchForm/SearchForm";

import {
  HeadLogoLinkStyled,
  LowerHeaderStyled,
  MenuWrapper,
} from "./LowerHeader.styled";

export const LowerHeader = () => {
  const width = useWindowWidth();

  return (
    <LowerHeaderStyled>
      <Container>
        {width > 767 && (
          <HeadLogoLinkStyled to="/">
            <Logo />
            CLICON
          </HeadLogoLinkStyled>
        )}
        <SearchForm />
        <MenuWrapper>
          <CartMenu />
          <WishlistMenu />
          <UserMenu />
        </MenuWrapper>
      </Container>
    </LowerHeaderStyled>
  );
};
