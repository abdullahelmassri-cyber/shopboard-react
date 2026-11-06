## Bug 1: Category chips have no list keys

- What I saw: After reload, the browser Console reported “Each child in a list should have a unique `key` prop” and named `CategoryChips`.
- Component: The lab sample's `src/components/CategoryChips.tsx`.
- How I found it: I opened the lab, reloaded it with the browser Console listener attached, and read the warning. I also inspected the downloaded lab source; its `categories.map` renders each `span` without a key.
- Cause: `CategoryChips` creates a list of spans without stable keys, so React cannot reliably track those children.
- Fix: I changed no project code because this is in the lab sample. Add `key={category}` to each mapped chip.

## Bug 2: Zero appears in stock notes and an empty cart

- What I saw: The sold-out Mini Crossbody Bag and Wool Scarf cards each displayed a standalone `0`; the empty cart also displayed `0` between “Cart” and “Total: $0”.
- Component: The lab sample's `src/components/StockNote.tsx` and `src/components/CartPanel.tsx`.
- How I found it: I reloaded the lab and read the rendered article and cart text in the browser. I inspected the downloaded source and found `{stock && ...}` in `StockNote` and `{cart.length && ...}` in `CartPanel`.
- Cause: With `&&`, a zero numeric left operand is rendered as text instead of rendering nothing.
- Fix: I changed no project code because this is in the lab sample. Use an explicit conditional that renders `null` for zero, such as `stock > 0 ? ... : null` and `cart.length > 0 ? ... : null`.

## Bug 3: The saved heart moves to another product

- What I saw: I saved the Leather Tote Bag, sorted by price ascending, and the heart appeared on Wool Scarf instead; Leather Tote Bag was no longer saved.
- Component: The lab sample's `src/components/ProductList.tsx` and `src/components/ProductCard.tsx`.
- How I found it: I clicked “Save Leather Tote Bag”, selected “Price: low to high”, and inspected each rendered card's heart button. I then inspected the source: `ProductList` uses the array index as the key, while each `ProductCard` owns its saved state.
- Cause: Sorting changes which product occupies each index key, so React reuses the saved component state for a different product.
- Fix: I changed no project code because this is in the lab sample. Use `product.id` as the `ProductCard` key.

## Bug 4: Featured order stays sorted

- What I saw: After selecting price ascending, switching back to Featured left the cards in ascending-price order instead of their initial order.
- Component: The lab sample's `src/components/ProductList.tsx`.
- How I found it: I recorded the initial card order, selected “Price: low to high”, then selected “Featured” and compared the rendered order. I inspected the source and found it sorts the `products` prop in place.
- Cause: `products.sort(...)` mutates the shared `PRODUCTS` array, so the Featured branch receives an already-sorted array.
- Fix: I changed no project code because this is in the lab sample. Sort a copy, for example `[...products].sort(...)`.

## Bug 5: Cart quantity changes do not render until another add

- What I saw: I added Canvas Backpack, clicked its plus button twice, and the cart continued to show quantity 1 and total $49. After adding White Sneakers, the backpack appeared as quantity 3, the header showed Cart (4), and the total became $222.
- Component: The lab sample's `src/components/CartRow.tsx`, with `onChange` wired by `src/components/CartPanel.tsx` to `setCart(cart)` in `src/App.tsx`.
- How I found it: I reloaded the lab, followed its cart steps, and read the cart DOM after each click. It stayed at 1/$49 after each plus click, then showed 3/$147 for the backpack after adding sneakers; the combined total was $222. I inspected the downloaded source and found `CartRow` mutates `item.qty` before asking `App` to set the same cart array.
- Cause: Mutating the existing item and passing the same array reference to `setCart` does not trigger a React state update. A later add creates a new array and reveals the earlier mutations.
- Fix: I changed no project code because this is in the lab sample. Update cart state immutably in the owner component, producing a new array and a new changed item for each quantity action.
