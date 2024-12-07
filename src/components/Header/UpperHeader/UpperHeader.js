import { ReactComponent as ArrowRightIcon } from "../../../icons/ArrowRight.svg";
import { Container } from "../../Container/Container";

import {
  FridayStyled,
  HeadSaleStyled,
  ShopLinkStyled,
  UpperHeaderStyled,
} from "./UpperHeader.styled";

export const UpperHeader = () => {
  return (
    <UpperHeaderStyled>
      <Container>
        <FridayStyled>
          <span>Black</span>
          Friday
        </FridayStyled>
        <HeadSaleStyled>
          Up to<span>59%</span>OFF
        </HeadSaleStyled>
        <ShopLinkStyled to="/"> {/* shop */}
          SHOP NOW
          <ArrowRightIcon />
        </ShopLinkStyled>
      </Container>
    </UpperHeaderStyled>
  );
};
