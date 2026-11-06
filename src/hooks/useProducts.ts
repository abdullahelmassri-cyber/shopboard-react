import { useEffect, useState } from "react";
import { getProducts } from "../modules/products/products.api";
import { products as imageCatalog } from "../modules/products/products.data";
import type { Product } from "../modules/products/products.types";

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 640 480'%3E%3Crect width='640' height='480' fill='%23e8ece6'/%3E%3Cpath d='M240 290h160l-20-90h-120z' fill='%23cbd4cc'/%3E%3C/svg%3E";

export interface DisplayProduct extends Product {
  image: string;
  cartSupported: boolean;
}

export type ProductsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "success"; products: DisplayProduct[] };

let inFlightRequest: Promise<Product[]> | null = null;

function requestProducts(): Promise<Product[]> {
  if (inFlightRequest !== null) return inFlightRequest;

  const request = getProducts();
  inFlightRequest = request;

  const clearRequest = () => {
    if (inFlightRequest === request) inFlightRequest = null;
  };

  void request.then(clearRequest, clearRequest);
  return request;
}

function withProductImages(products: Product[]): DisplayProduct[] {
  return products.map((product) => {
    const catalogProduct = imageCatalog.find((item) => item.id === product.id);
    return {
      ...product,
      image: catalogProduct?.image ?? PLACEHOLDER_IMAGE,
      cartSupported: catalogProduct !== undefined,
    };
  });
}

export function useProducts(): {
  state: ProductsState;
  retry: () => void;
} {
  const [state, setState] = useState<ProductsState>({ status: "loading" });
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    requestProducts()
      .then((products) => {
        if (active) {
          setState({ status: "success", products: withProductImages(products) });
        }
      })
      .catch((error: unknown) => {
        if (!active) return;
        const message =
          error instanceof Error ? error.message : "Unable to load products. Please try again.";
        setState({ status: "error", message });
      });

    return () => {
      active = false;
    };
  }, [retryCount]);

  return {
    state,
    retry: () => {
      setState({ status: "loading" });
      setRetryCount((count) => count + 1);
    },
  };
}
