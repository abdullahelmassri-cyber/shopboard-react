import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { addItem, changeQuantity, removeItem } from "./cart.logic";
import { CartContext } from "./CartContext";
import type { CartItem } from "./cart.types";

const CART_STORAGE_KEY = "shopboard-cart";

export interface Props {
  children: ReactNode;
}

function isCartItem(value: unknown): value is CartItem {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "number" &&
    Number.isFinite(value.id) &&
    "qty" in value &&
    typeof value.qty === "number" &&
    Number.isInteger(value.qty) &&
    value.qty > 0
  );
}

function isCartItems(value: unknown): value is CartItem[] {
  return Array.isArray(value) && value.every((item: unknown) => isCartItem(item));
}

function readInitialItems(): CartItem[] {
  try {
    const savedItems = window.localStorage.getItem(CART_STORAGE_KEY);
    if (savedItems === null) return [];
    const parsed: unknown = JSON.parse(savedItems);
    return isCartItems(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: Props) {
  const [items, setItems] = useState<CartItem[]>(readInitialItems);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn("Unable to save the cart; it will not persist after refresh.", error);
    }
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem: (id) => setItems((currentItems) => addItem(currentItems, id)),
        changeQuantity: (id, change) =>
          setItems((currentItems) => changeQuantity(currentItems, id, change)),
        removeItem: (id) => setItems((currentItems) => removeItem(currentItems, id)),
        clearCart: () => setItems(() => []),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
