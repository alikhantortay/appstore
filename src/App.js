import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { lazy } from "react";
import { GlobalStyle } from "./styles/GlobalStyle";

const HomePage = lazy(() => import("./pages/Home/Home"));
const ShopPage = lazy(() => import("./pages/Shop/Shop"));
const ComparePage = lazy(() =>
  import("./pages/Compare/Compare"),
);
const CardPage = lazy(() => import("./pages/Card/Card"));
const DetailsPage = lazy(() =>
  import("./pages/Details/Details"),
);
const NotFoundPage = lazy(() =>
  import("./pages/NotFound/NotFound"),
);

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route
            path="/compare"
            element={<ComparePage />}
          />
          <Route path="/Card" element={<CardPage />} />
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
