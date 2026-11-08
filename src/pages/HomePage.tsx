import { CatalogSection } from "../features/products/components/CatalogSection";
import { Hero } from "../features/products/components/Hero";
import { ProductsBoundary } from "../features/products/components/ProductsBoundary";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductsBoundary loadingMessage="Loading the collection...">
        <CatalogSection />
      </ProductsBoundary>
    </>
  );
}
