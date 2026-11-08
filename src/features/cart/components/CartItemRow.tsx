import type { CartLine } from "../cart.types";
import { useCart } from "../hooks/useCart";

export interface Props {
  line: CartLine;
}

export function CartItemRow({ line }: Props) {
  const { changeQuantity, removeItem } = useCart();

  return (
    <li className="cart-item">
      <span className="cart-item-name">{line.name}</span>
      <span>${line.lineTotal.toFixed(2)}</span>
      <div className="cart-qty" aria-label={`Quantity for ${line.name}`}>
        <button
          type="button"
          onClick={() => changeQuantity(line.id, -1)}
          aria-label={`Decrease ${line.name} quantity`}
        >
          &minus;
        </button>
        <span aria-live="polite">{line.qty}</span>
        <button
          type="button"
          onClick={() => changeQuantity(line.id, 1)}
          aria-label={`Increase ${line.name} quantity`}
        >
          +
        </button>
      </div>
      <button
        type="button"
        className="remove-button"
        onClick={() => removeItem(line.id)}
        aria-label={`Remove ${line.name} from cart`}
      >
        Remove
      </button>
    </li>
  );
}
