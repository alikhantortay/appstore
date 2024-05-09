import { ReactComponent as Logo } from "../../../icons/header/logo.svg";

import { SearchForm } from "./SearchForm/SearchForm";
import { CartMenu } from "./Menu/CartMenu";
import { WishlistMenu } from "./Menu/WishlistMenu";

import { Container } from "../../Container/Container";
import {
  HeadLogoLinkStyled,
  LowerHeaderStyled,
  MenuWrapper,
} from "./LowerHeader.styled";
import { UserMenu } from "./Menu/UserMenu";
import { useWindowWidth } from "../../../hooks/useWindowWidth";

export const LowerHeader = () => {
  const width = useWindowWidth();

  return (
    <LowerHeaderStyled>
      <Container>
        {width > 767 && (
          <HeadLogoLinkStyled>
            <Logo />
            <span>CLICON</span>
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
