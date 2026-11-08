import { useState } from "react";
import { getCategories, getVisibleProducts } from "../products.logic";
import type { CatalogCategory, CatalogState, PriceRange, SortOption } from "../products.types";
import type { ProductsState } from "../hooks/useProducts";
import { CatalogControls } from "./CatalogControls";
import { CatalogError } from "./CatalogError";
import { CatalogLoading } from "./CatalogLoading";
import { EmptyCatalog } from "./EmptyCatalog";
import { NoMatches } from "./NoMatches";
import { ProductGrid } from "./ProductGrid";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { SearchField } from "./SearchField";
import { SortSelect } from "./SortSelect";

export interface Props {
  productsState: ProductsState;
  onRetry: () => void;
}

const INITIAL_CATALOG_STATE: CatalogState = {
  search: "",
  category: "all",
  sort: "default",
};

const INITIAL_PRICE_RANGE: PriceRange = {};

export function CatalogPage({ productsState, onRetry }: Props) {
  const [catalogState, setCatalogState] = useState(INITIAL_CATALOG_STATE);
  const [priceRange, setPriceRange] = useState(INITIAL_PRICE_RANGE);

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

  const availableProducts = productsState.status === "success" ? productsState.products : [];
  const visibleProducts = getVisibleProducts(availableProducts, catalogState, priceRange);

  return (
    <>
      <section className="hero" aria-labelledby="shop-heading">
        <div className="hero-copy">
          <p className="eyebrow">Everyday, considered</p>
          <h1 id="shop-heading">Good things for the way you live.</h1>
          <p>Explore useful, lasting pieces for your everyday routine.</p>
          <a className="button" href="#products">
            Browse the collection
          </a>
        </div>
        <div
          className="hero-image hero-image-placeholder"
          role="img"
          aria-label="ShopBoard collection"
        />
      </section>

      <section className="products" id="products" aria-labelledby="products-heading">
        <p className="eyebrow">The collection</p>
        <h2 id="products-heading">Shop all</h2>
        {productsState.status === "loading" ? <CatalogLoading /> : null}
        {productsState.status === "error" ? (
          <CatalogError message={productsState.message} onRetry={onRetry} />
        ) : null}
        {productsState.status === "success" && productsState.products.length === 0 ? (
          <EmptyCatalog />
        ) : null}
        {productsState.status === "success" && productsState.products.length > 0 ? (
          <>
            <CatalogControls>
              <SearchField value={catalogState.search} onChange={updateSearch} />
              <CategoryFilter
                value={catalogState.category}
                options={getCategories(productsState.products)}
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
        ) : null}
      </section>
    </>
  );
}
