import { cartCount } from "../features/cart/cart.logic";
import { useCart } from "../features/cart/hooks/useCart";
import { CartSection } from "../features/cart/components/CartSection";
import { CatalogSection } from "../features/products/components/CatalogSection";
import { Hero } from "../features/products/components/Hero";
import { ProductsBoundary } from "../features/products/components/ProductsBoundary";

function App() {
  const { items } = useCart();
  const count = cartCount(items);

  return (
    <>
      <header className="site-header">
        <a className="logo" href="#top">
          ShopBoard
        </a>
        <nav aria-label="Main navigation">
          <ul className="nav-list">
            <li>
              <a href="#products">Shop</a>
            </li>
            <li>
              <a href="#cart">Your bag</a>
            </li>
          </ul>
        </nav>
        <p className="cart" aria-live="polite">
          Bag ({count})
        </p>
      </header>

      <main id="top">
        <Hero />
        <ProductsBoundary loadingMessage="Loading the collection...">
          <CatalogSection />
        </ProductsBoundary>
        <ProductsBoundary loadingMessage="Loading your bag...">
          <CartSection />
        </ProductsBoundary>
      </main>
      <footer className="site-footer">
        <p>Thoughtful everyday essentials, selected for ShopBoard.</p>
      </footer>
    </>
  );
}

export default App;
