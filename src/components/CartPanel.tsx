import type { CartLine } from "../modules/cart/cart.types";
import { CartItemRow } from "./CartItemRow";
import { CartSummary } from "./CartSummary";

export interface Props {
  lines: CartLine[];
  count: number;
  total: number;
  onChangeQuantity: (productId: number, change: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export function CartPanel({ lines, count, total, onChangeQuantity, onRemove, onClear }: Props) {
  return (
    <section className="cart-panel" id="cart" aria-labelledby="cart-heading">
      <p className="eyebrow">Your selection</p>
      <h2 id="cart-heading">Your bag</h2>
      {lines.length === 0 ? (
        <p className="cart-empty">Your bag is waiting for something good.</p>
      ) : (
        <ul className="cart-list">
          {lines.map((line) => (
            <CartItemRow
              key={line.id}
              line={line}
              onChangeQuantity={onChangeQuantity}
              onRemove={onRemove}
            />
          ))}
        </ul>
      )}
      <CartSummary count={count} total={total} onClear={onClear} />
    </section>
  );
}
