import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./RestaurantSite.css";
import { useAdminAuth } from "../restaurant/AdminAuthContext";
import {
  DEFAULT_BANNERS,
  DEFAULT_PRODUCTS,
  DEFAULT_STORE_DETAIL_SECTIONS,
  RESTAURANT_INFO,
  getStoredBanners,
  getStoredStoreDetails,
  getStoredProducts,
} from "../restaurant/store";

const yenFormatter = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
  maximumFractionDigits: 0,
});

const PRODUCT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80";
const BANNER_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80";

const TEXT = {
  navHome: "\u30db\u30fc\u30e0",
  navRecommendations: "\u304a\u3059\u3059\u3081",
  navBestSellers: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc",
  navAccess: "\u30a2\u30af\u30bb\u30b9",
  navDetails: "\u5e97\u8217\u8a73\u7d30",
  navAdmin: "\u7ba1\u7406",
  navAdminLogin: "\u7ba1\u7406\u30ed\u30b0\u30a4\u30f3",
  callNow: "\u96fb\u8a71\u3059\u308b",
  selectBanner: "\u30d0\u30ca\u30fc",
  chefPicks: "\u6599\u7406\u9577\u306e\u304a\u3059\u3059\u3081",
  recommendations: "\u304a\u3059\u3059\u3081",
  noRecommendations: "\u304a\u3059\u3059\u3081\u5546\u54c1\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002",
  mostPopular: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc",
  bestSellers: "\u30d9\u30b9\u30c8\u30bb\u30e9\u30fc",
  noBestSellers: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002",
  openMaps: "Google\u30de\u30c3\u30d7\u3067\u958b\u304f",
  badgeRecommended: "\u304a\u3059\u3059\u3081",
  badgePopular: "\u4eba\u6c17",
};

const STORE_MAP_EMBED_URL =
  "https://www.google.com/maps?q=921-2+Hiroba,+Kamogawa,+Chiba+296-0044&output=embed";

const normalizeStoreDetails = (sections) =>
  (Array.isArray(sections) ? sections : []).map((section, sectionIndex) => ({
    id:
      typeof section?.id === "string" && section.id.trim()
        ? section.id
        : `section-${sectionIndex + 1}`,
    title: typeof section?.title === "string" ? section.title : "",
    rows: (Array.isArray(section?.rows) ? section.rows : []).map((row) => ({
      label: typeof row?.label === "string" ? row.label : "",
      values: Array.isArray(row?.values) ? row.values : [String(row?.values || "")],
      mapEmbed: Boolean(row?.mapEmbed),
    })),
  }));

const ProductCard = ({ product, badgeLabel }) => (
  <article className="azuma-card">
    <div className="azuma-card-image-wrap">
      <img
        src={product.imageUrl || PRODUCT_FALLBACK_IMAGE}
        alt={product.name}
        className="azuma-card-image"
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = PRODUCT_FALLBACK_IMAGE;
        }}
      />
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
  const { isAllowed } = useAdminAuth();
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [storeDetails, setStoreDetails] = useState(() =>
    normalizeStoreDetails(DEFAULT_STORE_DETAIL_SECTIONS),
  );
  const [activeBannerIndex, setActiveBannerIndex] = useState(0);

  useEffect(() => {
    const loadedStoreDetails = normalizeStoreDetails(getStoredStoreDetails());
    setProducts(getStoredProducts());
    setBanners(getStoredBanners());
    setStoreDetails(
      loadedStoreDetails.length > 0
        ? loadedStoreDetails
        : normalizeStoreDetails(DEFAULT_STORE_DETAIL_SECTIONS),
    );
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
          <a href="#hero">{TEXT.navHome}</a>
          <a href="#recommendations">{TEXT.navRecommendations}</a>
          <a href="#best-sellers">{TEXT.navBestSellers}</a>
          <a href="#store-details">{TEXT.navDetails}</a>
          <a href="#access">{TEXT.navAccess}</a>
          <Link to={isAllowed ? "/admin" : "/admin-login"} className="azuma-admin-link">
            {isAllowed ? TEXT.navAdmin : TEXT.navAdminLogin}
          </Link>
        </div>
      </nav>

      <section
        className="azuma-hero"
        id="hero"
        style={{
          backgroundImage: `url(${currentBanner.imageUrl || BANNER_FALLBACK_IMAGE})`,
        }}
      >
        <div className="azuma-overlay" />
        <div className="azuma-hero-content" id="top">
          <p className="azuma-kicker">{RESTAURANT_INFO.subtitle}</p>
          <h1>{currentBanner.title}</h1>
          <p>{currentBanner.subtitle}</p>
          <div className="azuma-hero-actions">
            <a href={currentBanner.ctaLink}>{currentBanner.ctaText}</a>
            <a href={`tel:${RESTAURANT_INFO.phone.replace(/-/g, "")}`}>{TEXT.callNow}</a>
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
              aria-label={`${TEXT.selectBanner} ${index + 1} \u3092\u9078\u629e`}
            />
          ))}
        </div>
      )}

      <section className="azuma-section" id="recommendations">
        <div className="azuma-section-head">
          <p>{TEXT.chefPicks}</p>
          <h2>{TEXT.recommendations}</h2>
        </div>
        <div className="azuma-grid">
          {recommendedProducts.length === 0 && (
            <p className="azuma-empty">{TEXT.noRecommendations}</p>
          )}
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              badgeLabel={TEXT.badgeRecommended}
            />
          ))}
        </div>
      </section>

      <section className="azuma-section" id="best-sellers">
        <div className="azuma-section-head">
          <p>{TEXT.mostPopular}</p>
          <h2>{TEXT.bestSellers}</h2>
        </div>
        <div className="azuma-grid">
          {bestSellerProducts.length === 0 && (
            <p className="azuma-empty">{TEXT.noBestSellers}</p>
          )}
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} badgeLabel={TEXT.badgePopular} />
          ))}
        </div>
      </section>

      <section className="azuma-store-details" id="store-details">
        <div className="azuma-store-details-inner">
          <h2>\u5e97\u8217\u60c5\u5831\uff08\u8a73\u7d30\uff09</h2>
          {storeDetails.map((section) => (
            <div className="azuma-detail-group" key={section.id}>
              <h3 className="azuma-detail-group-title">{section.title}</h3>
              <div className="azuma-detail-table">
                {section.rows.map((row, rowIndex) => (
                  <div className="azuma-detail-row" key={`${section.id}-${rowIndex}`}>
                    <div className="azuma-detail-label">{row.label}</div>
                    <div className="azuma-detail-value">
                      {row.values
                        .filter((value) => String(value).trim() !== "")
                        .map((value, valueIndex) => (
                          <p key={`${section.id}-${rowIndex}-${valueIndex}`}>{value}</p>
                        ))}
                      {Boolean(row.mapEmbed) && (
                        <div className="azuma-map-embed-wrap">
                          <iframe
                            title="\u3042\u305a\u307e\u98df\u5802\u306e\u5730\u56f3"
                            src={STORE_MAP_EMBED_URL}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
            {TEXT.openMaps}
          </a>
        </div>
      </section>
    </main>
  );
}

export default RestaurantHome;
