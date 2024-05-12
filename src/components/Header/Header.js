import { useLocation } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";

import { LowerHeader } from "./LowerHeader/LowerHeader";
import { MidHeader } from "./MidHeader/MidHeader";
import { UpperHeader } from "./UpperHeader/UpperHeader";
import { NavHeader } from "./NavHeader/NavHeader";

export const Header = () => {
  const { pathname } = useLocation();
  const width = useWindowWidth();

  return (
    <header>
      {width > 767 && pathname === "/" && <UpperHeader />}
      <MidHeader />
      <LowerHeader />
      <NavHeader />
    </header>
  );
};
