import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { fetchCategories } from "./redux/shop/categoriesSlice";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { register } from "swiper/element/bundle";

import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { GlobalStyle } from "./styles/GlobalStyle";
import  Admin  from "./pages/Admin/Admin";

const HomePage = lazy(() => import("./pages/Home/Home"));
const AccountPage = lazy(() => import("./pages/Account/Account"));
const SignIn = lazy(() => import("./components/AccountPage/SignIn"));
const SignUp = lazy(() => import("./components/AccountPage/SignUp"));
const ForgetPassword = lazy(() =>
    import("./components/AccountPage/ForgetPassword/ForgetPassword")
);
const ShopPage = lazy(() => import("./pages/Shop/Shop"));
const WishlistPage = lazy(() => import("./pages/Wishlist/Wishlist"));
const CartPage = lazy(() => import("./pages/Cart/CartPage"));
const CheckoutPage = lazy(() => import("./pages/Checkout/Checkout"));
const DetailsPage = lazy(() => import("./pages/Details/Details"));
const Description = lazy(() =>
    import("./components/DetailsPage/Description/Description")
);
const AdditionalInfo = lazy(() =>
    import("./components/DetailsPage/AdditionalInfo/AdditionalInfo")
);
const Specs = lazy(() => import("./components/DetailsPage/Specs/Specs"));
const Reviews = lazy(() => import("./components/DetailsPage/Reviews/Reviews"));
const SupportPage = lazy(() => import("./pages/Support/Support"));
const NotFoundPage = lazy(() => import("./pages/NotFound/NotFound"));

Notify.init({
  width: "260px",
  position: "center-top",
  borderRadius: "2px",
  fontSize: "18px",
  useIcon: false,
  timeout: 2000,
  showOnlyTheLastOne: true,
  clickToClose: true,
  success: {
    background: "#f7e99e",
    textColor: "#2db324",
  },
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
  }, []);

  return (
      <>
        <Routes>
          {/* Основное приложение */}
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route
                path="/user-account"
                element={<RestrictedRoute component={<AccountPage />} />}
            >
              <Route path="sign-in" element={<SignIn />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="forget-password" element={<ForgetPassword />} />
            </Route>
            <Route path="/shop/:category?" element={<ShopPage />} />
            <Route path="/shopping-cart" element={<CartPage />} />
            <Route path="/shopping-cart/checkout" element={<CheckoutPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/shop/:category/:name" element={<DetailsPage />}>
              <Route index element={<Description />} />
              <Route path="additional-info" element={<AdditionalInfo />} />
              <Route path="specifications" element={<Specs />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* Админка без lazy */}
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <GlobalStyle />
      </>
  );
};

export default App;
