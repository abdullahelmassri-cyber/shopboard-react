import { useSyncExternalStore } from "react";
import {
  addCartProduct,
  changeCartProductQuantity,
  clearCartProducts,
  getCartVersion,
  removeCartProduct,
  subscribeToCart,
} from "./cartStoreAdapter";
import { getCartCount, getCartLines, getCartTotal } from "../modules/cart/cart.state";

export function useCart() {
  useSyncExternalStore(subscribeToCart, getCartVersion, getCartVersion);

  return {
    lines: getCartLines(),
    count: getCartCount(),
    total: getCartTotal(),
    addProduct: addCartProduct,
    changeQuantity: changeCartProductQuantity,
    removeProduct: removeCartProduct,
    clear: clearCartProducts,
  };
}
