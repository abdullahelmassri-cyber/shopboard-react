import { getProducts } from "./products.api";
import { withProductImages } from "./products.images";
import type { DisplayProduct } from "./products.types";

type Resource = { promise: Promise<DisplayProduct[]>; failed: boolean };

let resource: Resource | null = null;

export function getProductsResource(): Promise<DisplayProduct[]> {
  if (resource === null) {
    const promise = getProducts().then(withProductImages);
    const nextResource: Resource = { promise, failed: false };
    void promise.catch(() => {
      nextResource.failed = true;
    });
    resource = nextResource;
  }
  return resource.promise;
}

export function resetProductsResource(): void {
  if (resource !== null && resource.failed) {
    resource = null;
  }
}
