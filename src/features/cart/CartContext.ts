import { createContext } from "react";
import type { CartItem } from "./cart.types";

export interface CartContextValue {
  items: CartItem[];
  addItem: (id: number) => void;
  changeQuantity: (id: number, change: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextValue | null>(null);
