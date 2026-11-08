import type { ProductDetails } from "../products/products.types";
import type { CartItem, CartLine } from "./cart.types";

const INITIAL_QUANTITY = 1;
const MIN_QUANTITY = 1;

export function addItem(items: CartItem[], id: number): CartItem[] {
  const existingItem = items.find((item) => item.id === id);
  if (existingItem === undefined) {
    return [...items, { id, qty: INITIAL_QUANTITY }];
  }
  return items.map((item) =>
    item.id === id ? { ...item, qty: item.qty + INITIAL_QUANTITY } : item,
  );
}

export function changeQuantity(items: CartItem[], id: number, change: number): CartItem[] {
  if (!Number.isInteger(change) || change === 0) return items;

  const existingItem = items.find((item) => item.id === id);
  if (existingItem === undefined) return items;

  const nextQuantity = existingItem.qty + change;
  if (nextQuantity < MIN_QUANTITY) {
    return items.filter((item) => item.id !== id);
  }

  return items.map((item) => (item.id === id ? { ...item, qty: nextQuantity } : item));
}

export function removeItem(items: CartItem[], id: number): CartItem[] {
  return items.filter((item) => item.id !== id);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.qty, 0);
}

export function cartTotal(items: CartItem[], products: ProductDetails[]): number {
  return buildCartLines(items, products).reduce((total, line) => total + line.lineTotal, 0);
}

export function buildCartLines(items: CartItem[], products: ProductDetails[]): CartLine[] {
  return items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.id);
    if (product === undefined) return [];
    return [
      {
        id: item.id,
        name: product.name,
        price: product.price,
        qty: item.qty,
        lineTotal: product.price * item.qty,
      },
    ];
  });
}
