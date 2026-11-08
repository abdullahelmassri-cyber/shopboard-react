import { addToCart, changeQuantity, clearCart, removeFromCart } from "./cart.state";

type CartListener = () => void;

let version = 0;
const listeners = new Set<CartListener>();

export function subscribeToCart(listener: CartListener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getCartVersion(): number {
  return version;
}

function notifyCartChange(): void {
  version += 1;
  listeners.forEach((listener) => listener());
}

export function addCartProduct(productId: number): void {
  addToCart(productId);
  notifyCartChange();
}

export function changeCartProductQuantity(productId: number, change: number): void {
  changeQuantity(productId, change);
  notifyCartChange();
}

export function removeCartProduct(productId: number): void {
  removeFromCart(productId);
  notifyCartChange();
}

export function clearCartProducts(): void {
  clearCart();
  notifyCartChange();
}
