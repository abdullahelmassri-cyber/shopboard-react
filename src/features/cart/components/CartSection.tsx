import { use } from "react";
import { buildCartLines, cartCount, cartTotal } from "../cart.logic";
import { useCart } from "../hooks/useCart";
import { getProductsResource } from "../../products/products.resource";
import { CartPanel } from "./CartPanel";

export function CartSection() {
  const { items } = useCart();
  const products = use(getProductsResource());
  const lines = buildCartLines(items, products);
  const count = cartCount(items);
  const total = cartTotal(items, products);

  return <CartPanel lines={lines} count={count} total={total} />;
}
