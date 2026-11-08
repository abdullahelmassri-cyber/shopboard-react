import { useSyncExternalStore } from "react";
import {
  addCartProduct,
  changeCartProductQuantity,
  clearCartProducts,
  getCartVersion,
  removeCartProduct,
  subscribeToCart,
} from "../cart.adapter";
import { getCartCount, getCartLines, getCartTotal } from "../cart.state";

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
