import { useWindowWidth } from "../../hooks/useWindowWidth";

import { LowerHeader } from "./LowerHeader/LowerHeader";
import { MidHeader } from "./MidHeader/MidHeader";
import { UpperHeader } from "./UpperHeader/UpperHeader";

import { HeaderStyled } from "./Header.styled";

export const Header = () => {
  const width = useWindowWidth();

  return (
    <HeaderStyled>
      {width > 767 && <UpperHeader />}
      <MidHeader />
      <LowerHeader />
    </HeaderStyled>
  );
};
