import { use, useState } from "react";
import { getCategories, getVisibleProducts } from "../products.logic";
import { getProductsResource } from "../products.resource";
import type { CatalogCategory, CatalogState, PriceRange, SortOption } from "../products.types";
import { CatalogControls } from "./CatalogControls";
import { EmptyCatalog } from "./EmptyCatalog";
import { NoMatches } from "./NoMatches";
import { ProductGrid } from "./ProductGrid";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { SearchField } from "./SearchField";
import { SortSelect } from "./SortSelect";

const INITIAL_CATALOG_STATE: CatalogState = {
  search: "",
  category: "all",
  sort: "default",
};

const INITIAL_PRICE_RANGE: PriceRange = {};

export function CatalogSection() {
  const [catalogState, setCatalogState] = useState(INITIAL_CATALOG_STATE);
  const [priceRange, setPriceRange] = useState(INITIAL_PRICE_RANGE);
  const products = use(getProductsResource());

  function clearFilters(): void {
    setCatalogState(INITIAL_CATALOG_STATE);
    setPriceRange(INITIAL_PRICE_RANGE);
  }

  function updateSearch(search: string): void {
    setCatalogState((current) => ({ ...current, search }));
  }

  function updateCategory(category: CatalogCategory): void {
    setCatalogState((current) => ({ ...current, category }));
  }

  function updateSort(sort: SortOption): void {
    setCatalogState((current) => ({ ...current, sort }));
  }

  const visibleProducts = getVisibleProducts(products, catalogState, priceRange);

  return (
    <section className="products" id="products" aria-labelledby="products-heading">
      <p className="eyebrow">The collection</p>
      <h2 id="products-heading">Shop all</h2>
      {products.length === 0 ? (
        <EmptyCatalog />
      ) : (
        <>
          <CatalogControls>
            <SearchField value={catalogState.search} onChange={updateSearch} />
            <CategoryFilter
              value={catalogState.category}
              options={getCategories(products)}
              onChange={updateCategory}
            />
            <PriceFilter value={priceRange} onChange={setPriceRange} />
            <SortSelect value={catalogState.sort} onChange={updateSort} />
          </CatalogControls>
          {visibleProducts.length === 0 ? (
            <NoMatches search={catalogState.search} onClear={clearFilters} />
          ) : (
            <ProductGrid products={visibleProducts} />
          )}
        </>
      )}
    </section>
  );
}
