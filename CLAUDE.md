# CLAUDE.md

## Project

ShopBoard is a responsive Vite, React, TypeScript, and CSS storefront. Products load from the ShopBoard API; cart persistence uses local storage.

## Commands

- `npm run dev`: start Vite.
- `npm run typecheck`: check TypeScript.
- `npm run lint`: run Oxlint; warnings fail.
- `npm run build`: build for production.
- `npm run format`: format files with Prettier.
- `npm run format:check`: check formatting without changes.

## Project structure

```text
src/
  App.tsx
  components/       # One React component per .tsx file
  hooks/            # useProducts, useCart, cartStoreAdapter
  modules/
    products/       # Copied product data, API mapping, types, pure catalog logic
    cart/           # Copied cart types, calculations, and local-storage state
  shared/
    api/client.ts   # Copied typed API transport
```

## Architecture rules

- Put each reusable component in its own `src/components/<Name>.tsx` file.
- Give each component a named export and a typed `Props` interface; use an empty interface when it has no props.
- Put React hooks and external-store adapters in `src/hooks/`.
- `CatalogPage` owns search, category, price, and sort state.
- `useProducts` owns API products and its loading/error/success status.
- Derive visible products from filters during render; do not store derived lists in state.
- `App` calls `useCart()` once and passes cart values and callbacks down as props.
- `src/modules/cart/cart.state.ts` owns cart data; update it only through `src/hooks/cartStoreAdapter.ts`.
- Subscribe to the cart store with `useSyncExternalStore`; do not create a second React-owned cart copy.
- Keep the API response authoritative for product ID, name, category, price, and stock.
- Use matching `products.data.ts` entries for images; use a placeholder when no image matches.
- Cart lines and totals currently use `products.data.ts`; API IDs, names, and prices must stay aligned with that catalog.
- Make product request effects ignore stale responses and share in-flight requests so StrictMode does not duplicate fetches.
- Render distinct loading, error-with-retry, empty-catalog, and no-match states.
- Use semantic HTML, one `h1`, associated form labels, and native input validation.

## Repository rules

- Never edit files under `src/modules/` or `src/shared/`.
- Do not use `any`, `as` assertions, or non-null assertions (`!`).
- Configure Oxlint in `.oxlintrc.json` to error on `typescript/no-explicit-any`, `typescript/no-non-null-assertion`, `typescript/consistent-type-assertions`, and `react/no-array-index-key`.
- Verify lint rules with a temporary failing fixture, then remove the fixture.
- Use stable data identifiers for React list keys; never use array indexes.
- Do not mutate props or shared data; copy arrays before sorting.
- Do not use numeric values directly as JSX `&&` conditions when zero could be rendered; use an explicit comparison or conditional.
- Treat local-storage values as untrusted; keep cart quantities positive and remove a line when its quantity reaches zero.
- Run `npm run typecheck`, `npm run lint`, `npm run build`, and `npm run format:check` after code changes.
- Commit through the Husky hook; do not bypass it.
- Use exact absolute Windows paths for filesystem operations and verify the target before writing.
- When copying code between projects, inspect every copied file's direct and transitive imports and copy required dependencies.
- Check the destination `tsconfig` against copied syntax; in particular, `erasableSyntaxOnly` rejects TypeScript parameter properties.
- For external debug labs, distinguish the lab's downloadable sample from this repository; reproduce each reported bug and verify its source before documenting it.
