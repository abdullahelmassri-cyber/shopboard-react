import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { CartProvider } from "./features/cart/CartProvider";
import "./index.css";
import App from "./app/App";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Missing #root application element.");
}

createRoot(rootElement).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
);
