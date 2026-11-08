export function Hero() {
  return (
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
  );
}
