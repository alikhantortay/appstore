import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { fetchCategories } from "./redux/shop/categoriesSlice";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { register } from "swiper/element/bundle";

import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { ScrollToTop } from "./components/ScrollToTop";
import { GlobalStyle } from "./styles/GlobalStyle";

const HomePage = lazy(() => import("./pages/Home/Home"));
const AccountPage = lazy(() =>
  import("./pages/Account/Account"),
);
const SignIn = lazy(() =>
  import("./components/AccountPage/SignIn"),
);
const SignUp = lazy(() =>
  import("./components/AccountPage/SignUp"),
);
const ForgetPassword = lazy(() =>
  import(
    "./components/AccountPage/ForgetPassword/ForgetPassword"
  ),
);
const ShopPage = lazy(() => import("./pages/Shop/Shop"));
const ComparePage = lazy(() =>
  import("./pages/Compare/Compare"),
);
const WishlistPage = lazy(() =>
  import("./pages/Wishlist/Wishlist"),
);
const CartPage = lazy(() =>
  import("./pages/Cart/CartPage"),
);
const CherckoutPage = lazy(() =>
  import("./pages/Ckeckout/Ckeckout"),
);
const DetailsPage = lazy(() =>
  import("./pages/Details/Details"),
);
const AboutPage = lazy(() => import("./pages/About/About"));
const SupportPage = lazy(() =>
  import("./pages/Support/Support"),
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
  timeout: 2000,
  showOnlyTheLastOne: true,
  clickToClose: true,

  failure: {
    background: "#f7e99e",
    textColor: "#2da5f3",
  },
});

register();

const App = () => {
  const dispatch = useDispatch();
  const { checkIsUserLoggedIn } = useAuth();

  useEffect(() => {
    checkIsUserLoggedIn();
    dispatch(fetchCategories());
  });

  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route
            path="/user-account"
            element={
              <RestrictedRoute
                component={<AccountPage />}
              />
            }>
            <Route path="sign-in" element={<SignIn />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route
              path="forget-password"
              element={<ForgetPassword />}
            />
          </Route>

          <Route
            path="/shop/:category?"
            element={<ShopPage />}
          />
          <Route
            path="/compare"
            element={<ComparePage />}
          />
          <Route
            path="/shopping-cart"
            element={<CartPage />}
          />
          <Route
            path="/shopping-cart/checkout"
            element={<CherckoutPage />}
          />

          <Route
            path="/wishlist"
            element={<WishlistPage />}
          />
          <Route
            path="/shop/:category/:title"
            element={<DetailsPage />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/support"
            element={<SupportPage />}
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <GlobalStyle />
      <ScrollToTop />
    </>
  );
};

export default App;
