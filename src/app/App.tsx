import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import { RootLayout } from "./RootLayout";
import { LoadingNotice } from "../shared/components/LoadingNotice";

const HomePage = lazy(() => import("../pages/HomePage"));
const ProductPage = lazy(() => import("../pages/ProductPage"));
const CartPage = lazy(() => import("../pages/CartPage"));
const CheckoutPage = lazy(() => import("../pages/CheckoutPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={
            <Suspense fallback={<LoadingNotice message="Loading home page..." />}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="products/:id"
          element={
            <Suspense fallback={<LoadingNotice message="Loading product page..." />}>
              <ProductPage />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<LoadingNotice message="Loading cart page..." />}>
              <CartPage />
            </Suspense>
          }
        />
        <Route
          path="checkout"
          element={
            <Suspense fallback={<LoadingNotice message="Loading checkout page..." />}>
              <CheckoutPage />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<LoadingNotice message="Loading page..." />}>
              <NotFoundPage />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
