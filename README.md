# ShopBoard React

ShopBoard is a responsive storefront built with React, TypeScript, Vite, and React Router. It includes a searchable product catalog, product details, a shared persistent cart, and a validated demo checkout. Tailwind CSS and shadcn/ui components provide the checkout styling.

## Getting started

Install dependencies and start the development server:

```sh
npm install
npm run dev
```

The development server prints its local URL. No environment variables are required. Product data and product images use external services, so an internet connection is needed for live catalog content.

## Routes and features

- `/` - Product catalog with search, category, price, and sort filters; empty and no-match states.
- `/products/:id` - Product details, stock status, and add-to-cart action.
- `/cart` - Shared cart with quantity controls, item removal, subtotal, and a checkout link.
- `/checkout` - Validated checkout form and order summary. An empty cart cannot be checked out.
- Any other path - Not Found page.

Pages are lazy-loaded. Suspense displays loading messages, and product-loading errors have a retry action.

## Product data and cart

Products are fetched from `https://shopboard-api.vercel.app/api/products`, validated, and used by the catalog, product pages, cart, and checkout summary. Product images are matched by product ID, with a placeholder when no image is mapped or an image request fails.

A cart provider at the application root shares cart state across routes. Cart items are saved in browser local storage and validated when read; invalid or unreadable saved data falls back to an empty cart. Product names and prices in the cart are resolved from the loaded product data.

## Checks and build

```sh
npm run typecheck
npm run lint
npm run format:check
npm run build
```

`npm run format` formats the project, and `npm run preview` serves a production build locally.

## Demo checkout

Checkout validates the customer's name, email, and address in the browser. Completing the form clears the cart and displays a thank-you message. **This is a demo only: it does not place or send a real order and does not process payment.** There is no backend checkout or payment integration. Product data and remote product images may be unavailable if their external services cannot be reached.
