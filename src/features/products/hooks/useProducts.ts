import { useSyncExternalStore } from "react";
import { getProducts } from "../products.api";
import { productImages } from "../products.images";
import type { Product } from "../products.types";

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23e8ece6'/%3E%3Cpath d='M240 290h160l-20-90h-120z' fill='%23cbd4cc'/%3E%3C/svg%3E";

export interface DisplayProduct extends Product {
  image: string;
}

export type ProductsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: DisplayProduct[] };

let productsState: ProductsState = { status: "loading" };
let inFlightRequest: Promise<Product[]> | null = null;
let requestVersion = 0;
const listeners = new Set<() => void>();

function withProductImages(products: Product[]): DisplayProduct[] {
  return products.map((product) => {
    const image = productImages[product.id];
    return {
      ...product,
      image: image ?? PLACEHOLDER_IMAGE,
    };
  });
}

function notifyListeners(): void {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): ProductsState {
  return productsState;
}

function startProductsRequest(): void {
  if (inFlightRequest !== null) return;

  const request = getProducts();
  const currentVersion = requestVersion + 1;
  requestVersion = currentVersion;
  inFlightRequest = request;
  productsState = { status: "loading" };
  notifyListeners();

  void request.then(
    (products) => {
      if (currentVersion !== requestVersion) return;
      inFlightRequest = null;
      productsState = { status: "success", products: withProductImages(products) };
      notifyListeners();
    },
    (error: unknown) => {
      if (currentVersion !== requestVersion) return;
      inFlightRequest = null;
      const message =
        error instanceof Error ? error.message : "Unable to load products. Please try again.";
      productsState = { status: "error", message };
      notifyListeners();
    },
  );
}

function retryProducts(): void {
  requestVersion += 1;
  inFlightRequest = null;
  startProductsRequest();
}

startProductsRequest();

export function useProducts(): {
  state: ProductsState;
  retry: () => void;
} {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return { state, retry: retryProducts };
}
