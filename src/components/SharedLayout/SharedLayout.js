import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { LocationPanel } from "../LocationPanel/LocationPanel";

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
