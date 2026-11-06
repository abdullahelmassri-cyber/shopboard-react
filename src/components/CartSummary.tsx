export interface Props {
  count: number;
  total: number;
  onClear: () => void;
}

export function CartSummary({ count, total, onClear }: Props) {
  return (
    <div className="cart-summary">
      <p className="cart-count" aria-live="polite">
        {count} {count === 1 ? "item" : "items"}
      </p>
      <p className="cart-total">Subtotal: ${total.toFixed(2)}</p>
      <button type="button" id="clear-cart" disabled={count === 0} onClick={onClear}>
        Clear bag
      </button>
    </div>
  );
}
