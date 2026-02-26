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
          <a href="#hero">ホーム</a>
          <a href="#recommendations">おすすめ</a>
          <a href="#best-sellers">人気メニュー</a>
          <a href="#access">アクセス</a>
          <Link to="/admin" className="azuma-admin-link">
            管理
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
              電話する
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
              aria-label={`バナー ${index + 1} を選択`}
            />
          ))}
        </div>
      )}

      <section className="azuma-section" id="recommendations">
        <div className="azuma-section-head">
          <p>料理長のおすすめ</p>
          <h2>おすすめ</h2>
        </div>
        <div className="azuma-grid">
          {recommendedProducts.length === 0 && (
            <p className="azuma-empty">おすすめ商品はまだありません。</p>
          )}
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} badgeLabel="おすすめ" />
          ))}
        </div>
      </section>

      <section className="azuma-section" id="best-sellers">
        <div className="azuma-section-head">
          <p>人気メニュー</p>
          <h2>ベストセラー</h2>
        </div>
        <div className="azuma-grid">
          {bestSellerProducts.length === 0 && (
            <p className="azuma-empty">人気メニューはまだありません。</p>
          )}
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} badgeLabel="人気" />
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
            Googleマップで開く
          </a>
        </div>
      </section>
    </main>
  );
}

export default RestaurantHome;
