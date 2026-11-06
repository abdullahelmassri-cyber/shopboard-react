# ShopBoard React

A React and TypeScript storefront.

## Component tree

The tree shows reusable component nesting from the current JSX. HTML elements
such as `header`, `main`, `section`, and `ul` are shown only where they contain
components or distinguish conditional rendering branches.

```text
App — no props
├── header
├── main
│   ├── CatalogPage — `onAddToCart: (productId: number) => void`
│   │   ├── hero section (HTML only)
│   │   └── products section
│   │       ├── CatalogLoading (loading branch) — no props
│   │       ├── CatalogError (error branch) — `message: string`; `onRetry: () => void`
│   │       ├── EmptyCatalog (successful empty response) — no props
│   │       └── successful non-empty response
│   │           ├── CatalogControls — `children: ReactNode`
│   │           │   ├── SearchField — `value: string`; `onChange: (value: string) => void`
│   │           │   ├── CategoryFilter — `value: CatalogCategory`; `options: Category[]`; `onChange: (value: CatalogCategory) => void`
│   │           │   ├── PriceFilter — `value: PriceRange`; `onChange: (value: PriceRange) => void`
│   │           │   └── SortSelect — `value: SortOption`; `onChange: (value: SortOption) => void`
│   │           ├── NoMatches (when filters produce no results) — `search: string`; `onClear: () => void`
│   │           └── ProductGrid (when visible products exist) — `products: readonly DisplayProduct[]`; `onAddToCart: (productId: number) => void`
│   │               └── ProductCard (once per product) — `product: DisplayProduct`; `onAddToCart: (productId: number) => void`
│   └── CartPanel — `lines: CartLine[]`; `count: number`; `total: number`; `onChangeQuantity: (productId: number, change: number) => void`; `onRemove: (productId: number) => void`; `onClear: () => void`
│       ├── CartItemRow (once per cart line; when cart is not empty) — `line: CartLine`; `onChangeQuantity: (productId: number, change: number) => void`; `onRemove: (productId: number) => void`
│       └── CartSummary — `count: number`; `total: number`; `onClear: () => void`
└── footer
```

### State ownership

- **Products and request status** are owned by `useState` in `src/hooks/useProducts.ts` as a discriminated loading/error/success state. `CatalogPage` calls the hook and renders that state; successful products flow to the filter controls and `ProductGrid` through props.
- **Search, category, and sort** are owned by `CatalogPage` in `src/components/CatalogPage.tsx` as `catalogState`. The corresponding controls receive their values and change callbacks as props.
- **Price filter** is owned by `CatalogPage` in `src/components/CatalogPage.tsx` as `priceRange`, passed to `PriceFilter` with its update callback.
- **Cart** is owned by the module-level cart variable in `src/modules/cart/cart.state.ts`. `App` calls `useCart()` once and passes lines, count, total, and action callbacks to `CartPanel`; `CartPanel` passes each line and row callbacks to `CartItemRow`, and count/total/clear to `CartSummary`.

### Hooks and modules

- `useProducts` (`src/hooks/useProducts.ts`) fetches API products, ignores stale effect results, deduplicates an in-flight request, exposes retry, and adds matching catalog images or a placeholder.
- `useCart` (`src/hooks/useCart.ts`) subscribes to cart version changes and returns current lines, count, total, and cart actions.
- `cartStoreAdapter` (`src/hooks/cartStoreAdapter.ts`) wraps the existing cart state actions and notifies `useSyncExternalStore` subscribers after mutations.
- Product fetching and catalog filtering use `src/modules/products/products.api.ts` and `src/modules/products/products.logic.ts`; cart data and calculations use `src/modules/cart/cart.state.ts` and `src/modules/cart/cart.logic.ts`.

### Known limitations

Cart lines and totals are computed from `src/modules/products/products.data.ts`
inside the copied cart module. If API product IDs, names, or prices change
without corresponding catalog updates, cart validation, displayed details, or
totals can diverge from the API.
