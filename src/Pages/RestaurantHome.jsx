import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./RestaurantSite.css";
import {
  DEFAULT_BANNERS,
  DEFAULT_PRODUCTS,
  RESTAURANT_INFO,
  getStoredBanners,
  getStoredProducts,
} from "../restaurant/store";

const yenFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

const ProductCard = ({ product, badgeLabel }) => (
  <article className="azuma-card">
    <div className="azuma-card-image-wrap">
      <img src={product.imageUrl} alt={product.name} className="azuma-card-image" />
      <span className="azuma-card-badge">{badgeLabel}</span>
    </div>
    <div className="azuma-card-content">
      <p className="azuma-card-category">{product.category}</p>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <strong>{yenFormatter.format(product.price)}</strong>
    </div>
  </article>
);

function RestaurantHome() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  useEffect(() => {
    setProducts(getStoredProducts());
    setBanners(getStoredBanners());
  }, []);

  const activeBanners = useMemo(
    () => banners.filter((banner) => banner.active),
    [banners],
  );

  const currentBanner =
    activeBanners[activeBannerIndex] ??
    activeBanners[0] ??
    banners[0] ??
    DEFAULT_BANNERS[0];

  const recommendedProducts = useMemo(
    () => products.filter((product) => product.recommended).slice(0, 6),
    [products],
  );
  const bestSellerProducts = useMemo(
    () => products.filter((product) => product.bestSeller).slice(0, 6),
    [products],
  );

  useEffect(() => {
    if (activeBanners.length <= 1) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setActiveBannerIndex((previousIndex) =>
        (previousIndex + 1) % activeBanners.length,
      );
    }, 5000);

    return () => window.clearInterval(interval);
  }, [activeBanners.length]);

  useEffect(() => {
    if (activeBannerIndex >= activeBanners.length) {
      setActiveBannerIndex(0);
    }
  }, [activeBannerIndex, activeBanners.length]);

  return (
    <main className="azuma-site">
      <nav className="azuma-nav">
        <a href="#top" className="azuma-brand">
          {RESTAURANT_INFO.name}
        </a>
        <div className="azuma-nav-links">
          <a href="#hero">\u30db\u30fc\u30e0</a>
          <a href="#recommendations">\u304a\u3059\u3059\u3081</a>
          <a href="#best-sellers">\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc</a>
          <a href="#access">\u30a2\u30af\u30bb\u30b9</a>
          <Link to="/admin" className="azuma-admin-link">
            \u7ba1\u7406
          </Link>
        </div>
      </nav>

      <section
        className="azuma-hero"
        id="hero"
        style={{ backgroundImage: `url(${currentBanner.imageUrl})` }}
      >
        <div className="azuma-overlay" />
        <div className="azuma-hero-content" id="top">
          <p className="azuma-kicker">{RESTAURANT_INFO.subtitle}</p>
          <h1>{currentBanner.title}</h1>
          <p>{currentBanner.subtitle}</p>
          <div className="azuma-hero-actions">
            <a href={currentBanner.ctaLink}>{currentBanner.ctaText}</a>
            <a href={`tel:${RESTAURANT_INFO.phone.replace(/-/g, "")}`}>
              \u96fb\u8a71\u3059\u308b
            </a>
          </div>
        </div>
      </section>

      {activeBanners.length > 1 && (
        <div className="azuma-banner-dots">
          {activeBanners.map((banner, index) => (
            <button
              key={banner.id}
              className={index === activeBannerIndex ? "active" : ""}
              onClick={() => setActiveBannerIndex(index)}
              type="button"
              aria-label={`\u30d0\u30ca\u30fc ${index + 1} \u3092\u9078\u629e`}
            />
          ))}
        </div>
      )}

      <section className="azuma-section" id="recommendations">
        <div className="azuma-section-head">
          <p>\u6599\u7406\u9577\u306e\u304a\u3059\u3059\u3081</p>
          <h2>\u304a\u3059\u3059\u3081</h2>
        </div>
        <div className="azuma-grid">
          {recommendedProducts.length === 0 && (
            <p className="azuma-empty">\u304a\u3059\u3059\u3081\u5546\u54c1\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002</p>
          )}
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} badgeLabel="\u304a\u3059\u3059\u3081" />
          ))}
        </div>
      </section>

      <section className="azuma-section" id="best-sellers">
        <div className="azuma-section-head">
          <p>\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc</p>
          <h2>\u30d9\u30b9\u30c8\u30bb\u30e9\u30fc</h2>
        </div>
        <div className="azuma-grid">
          {bestSellerProducts.length === 0 && (
            <p className="azuma-empty">\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002</p>
          )}
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} badgeLabel="\u4eba\u6c17" />
          ))}
        </div>
      </section>

      <section className="azuma-contact" id="access">
        <h2>{RESTAURANT_INFO.name}</h2>
        <p>{RESTAURANT_INFO.address}</p>
        <p>{RESTAURANT_INFO.openHours}</p>
        <div className="azuma-contact-actions">
          <a href={`tel:${RESTAURANT_INFO.phone.replace(/-/g, "")}`}>
            {RESTAURANT_INFO.phone}
          </a>
          <a href={RESTAURANT_INFO.mapsLink} target="_blank" rel="noopener noreferrer">
            Google\u30de\u30c3\u30d7\u3067\u958b\u304f
          </a>
        </div>
      </section>
    </main>
  );
}

export default RestaurantHome;
