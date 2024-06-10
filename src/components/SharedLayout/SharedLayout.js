import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { Header } from "../Header/Header";
import { LocationPanel } from "../LocationPanel/LocationPanel";
import { Footer } from "../Footer/Footer";

export const SharedLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      {pathname !== "/" && <LocationPanel />}
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};
