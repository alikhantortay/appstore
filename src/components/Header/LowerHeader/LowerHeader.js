import { ReactComponent as Logo } from "../../../icons/header/logo.svg";

import { Container } from "../../Container/Container";
import {
  HeadLogoStyled,
  LowerHeaderStyled,
} from "./LowerHeader.styled";

export const LowerHeader = () => {
  return (
    <LowerHeaderStyled>
      <Container>
        <HeadLogoStyled>
          <Logo />
          <p>CLICON</p>
        </HeadLogoStyled>
      </Container>
    </LowerHeaderStyled>
  );
};
