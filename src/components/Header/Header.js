import { useWindowWidth } from "../../hooks/useWindowWidth";

import { LowerHeader } from "./LowerHeader/LowerHeader";
import { MidHeader } from "./MidHeader/MidHeader";
import { UpperHeader } from "./UpperHeader/UpperHeader";

export const Header = () => {
  const width = useWindowWidth();

  return (
    <header>
      {width > 767 && <UpperHeader />}
      <MidHeader />
      <LowerHeader />
    </header>
  );
};
