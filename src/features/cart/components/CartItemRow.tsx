import type { CartLine } from "../cart.types";

export interface Props {
  line: CartLine;
  onChangeQuantity: (productId: number, change: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItemRow({ line, onChangeQuantity, onRemove }: Props) {
  return (
    <li className="cart-item">
      <span className="cart-item-name">{line.name}</span>
      <span>${line.lineTotal.toFixed(2)}</span>
      <div className="cart-qty" aria-label={`Quantity for ${line.name}`}>
        <button
          type="button"
          onClick={() => onChangeQuantity(line.id, -1)}
          aria-label={`Decrease ${line.name} quantity`}
        >
          −
        </button>
        <span aria-live="polite">{line.quantity}</span>
        <button
          type="button"
          onClick={() => onChangeQuantity(line.id, 1)}
          aria-label={`Increase ${line.name} quantity`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(line.id)}
        aria-label={`Remove ${line.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
