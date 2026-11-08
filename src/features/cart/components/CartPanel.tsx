import type { CartLine } from "../cart.types";
import type { ProductsState } from "../../products/hooks/useProducts";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";

export interface Props {
  lines: CartLine[];
  count: number;
  total: number;
  productsState: ProductsState;
}

export function CartPanel({ lines, count, total, productsState }: Props) {
  return (
    <section
      className="cart-panel"
      id="cart"
      aria-labelledby="cart-heading"
      aria-busy={productsState.status === "loading"}
    >
      <p className="eyebrow">Your selection</p>
      <h2 id="cart-heading">Your bag</h2>
      {lines.length === 0 ? (
        <p className="cart-empty">Your bag is waiting for something good.</p>
      ) : (
        <ul className="cart-list">
          {lines.map((line) => (
            <CartItemRow key={line.id} line={line} />
          ))}
        </ul>
      )}
      <CartSummary count={count} total={total} />
    </section>
  );
}
