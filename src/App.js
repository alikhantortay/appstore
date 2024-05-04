import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { GlobalStyle } from "./styles/GlobalStyle";
import { useDispatch } from "react-redux";
import { checkIsUserLoggedIn } from "./firebase";

const HomePage = lazy(() => import("./pages/Home/Home"));
const SignInPage = lazy(() =>
  import("./pages/SignIn/SignIn"),
);
const ShopPage = lazy(() => import("./pages/Shop/Shop"));
const ComparePage = lazy(() =>
  import("./pages/Compare/Compare"),
);
const CartPage = lazy(() => import("./pages/Cart/Cart"));
const WishlistPage = lazy(() =>
  import("./pages/Wishlist/Wishlist"),
);
const DetailsPage = lazy(() =>
  import("./pages/Details/Details"),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFound/NotFound"),
);

Notify.init({
  width: "260px",
  position: "center-top",
  borderRadius: "2px",
  fontSize: "18px",
  useIcon: false,
  timeout: 3000,
  showOnlyTheLastOne: true,
  clickToClose: true,

  failure: {
    background: "#ebc80c",
    textColor: "#191c1f",
  },
});

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkIsUserLoggedIn(dispatch);
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/compare"
            element={<ComparePage />}
          />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/wishlist"
            element={<WishlistPage />}
          />
          <Route
            path="details/:id"
            element={<DetailsPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </>
  );
};

export default App;
