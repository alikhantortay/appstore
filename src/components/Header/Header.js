import { HeaderStyled } from "./Header.styled";
import { LowerHeader } from "./LowerHeader/LowerHeader";
import { MidHeader } from "./MidHeader/MidHeader";
import { UpperHeader } from "./UpperHeader/UpperHeader";

export const Header = () => {
  return (
    <HeaderStyled>
      <UpperHeader />
      <MidHeader />
      <LowerHeader />
    </HeaderStyled>
  );
};
