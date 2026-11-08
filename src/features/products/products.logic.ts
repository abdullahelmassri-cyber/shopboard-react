import type { ProductDetails } from "./products.types";
import type { CatalogState, Category, PriceRange } from "./products.types";

const ALL_CATEGORIES = "all";

export function getCategories(products: readonly ProductDetails[]): Category[] {
  return [...new Set(products.map((product) => product.category))];
}

export function getVisibleProducts<T extends ProductDetails>(
  products: readonly T[],
  { search, category, sort }: CatalogState,
  priceRange: PriceRange = {},
): T[] {
  const query = search.trim().toLowerCase();

  const result = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(query);
    const matchesCategory = category === ALL_CATEGORIES || product.category === category;
    const matchesMinimumPrice = priceRange.min === undefined || product.price >= priceRange.min;
    const matchesMaximumPrice = priceRange.max === undefined || product.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesMinimumPrice && matchesMaximumPrice;
  });

  if (sort === "asc") {
    result.sort((first, second) => first.price - second.price);
  } else if (sort === "desc") {
    result.sort((first, second) => second.price - first.price);
  }

  return result;
}
