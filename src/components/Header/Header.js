import { useLocation } from "react-router-dom";
import { useWindowWidth } from "../../hooks/useWindowWidth";

import { UpperHeader } from "./UpperHeader/UpperHeader";
import { MidHeader } from "./MidHeader/MidHeader";
import { LowerHeader } from "./LowerHeader/LowerHeader";
import { NavHeader } from "./NavHeader/NavHeader";

export const Header = () => {
  const { pathname } = useLocation();
  const width = useWindowWidth();

  return (
    <header>
      {width > 767 && pathname === "/" /* && <UpperHeader /> */}
      {/* <MidHeader /> */}
      <LowerHeader />
      <NavHeader />
    </header>
  );
};
