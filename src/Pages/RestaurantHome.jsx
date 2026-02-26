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

const STORE_DETAIL_SECTIONS = [
  {
    id: "basic",
    title: "\u5e97\u8217\u57fa\u672c\u60c5\u5831",
    rows: [
      { label: "\u5e97\u540d", values: [RESTAURANT_INFO.name] },
      { label: "\u30b8\u30e3\u30f3\u30eb", values: ["\u5c45\u9152\u5c4b\u3001\u548c\u98df"] },
      {
        label: "\u4e88\u7d04\u30fb\u304a\u554f\u3044\u5408\u308f\u305b",
        values: [RESTAURANT_INFO.phone],
      },
      { label: "\u4e88\u7d04\u53ef\u5426", values: ["\u4e88\u7d04\u53ef"] },
      {
        label: "\u4f4f\u6240",
        values: [RESTAURANT_INFO.address],
        mapEmbed: true,
      },
      {
        label: "\u4ea4\u901a\u624b\u6bb5",
        values: [
          "JR\u5916\u623f\u7dda \u5b89\u623f\u9d28\u5ddd\u99c5 \u6771\u53e3\u3088\u308a\u8eca\u3067\u7d047\u5206",
          "\u5b89\u623f\u9d28\u5ddd\u99c5\u304b\u3089\u7d042.5km",
        ],
      },
    ],
  },
  {
    id: "hours-budget",
    title: "\u55b6\u696d\u6642\u9593\u30fb\u4e88\u7b97",
    rows: [
      {
        label: "\u55b6\u696d\u6642\u9593",
        values: [
          "\u6708\u30fb\u706b\u30fb\u6c34\u30fb\u6728\u30fb\u91d1\u30fb\u571f",
          "17:30 - 23:00  L.O. 22:30",
          "\u65e5\u30fb\u795d\u65e5",
          "17:30 - 23:00  L.O. 22:30",
          "\u25a0 \u5b9a\u4f11\u65e5\uff1a\u4e0d\u5b9a\u4f11",
        ],
      },
      { label: "\u4e88\u7b97", values: ["\u00a52,000\u301c\u00a53,999"] },
      { label: "\u4e88\u7b97\uff08\u53e3\u30b3\u30df\u96c6\u8a08\uff09", values: ["\u00a53,000\u301c\u00a54,999"] },
      {
        label: "\u652f\u6255\u3044\u65b9\u6cd5",
        values: [
          "\u30ab\u30fc\u30c9\u53ef\uff08VISA\u3001Master\u3001JCB\u3001AMEX\uff09",
          "\u96fb\u5b50\u30de\u30cd\u30fc\u4e0d\u53ef",
          "QR\u30b3\u30fc\u30c9\u6c7a\u6e08\u4e0d\u53ef",
        ],
      },
    ],
  },
  {
    id: "seat-facility",
    title: "\u5e2d\u30fb\u8a2d\u5099",
    rows: [
      {
        label: "\u500b\u5ba4",
        values: [
          "\u6709\uff086\u540d\u5e2d\u30018\u540d\u5e2d\uff09",
          "\u203b\u5c11\u4eba\u6570\u3067\u306e\u3054\u5229\u7528\u306f\u304a\u96fb\u8a71\u306b\u3066\u3054\u76f8\u8ac7\u304f\u3060\u3055\u3044\u3002",
        ],
      },
      { label: "\u8cb8\u5207", values: ["\u53ef\uff0820\u4eba\u4ee5\u4e0b\u53ef\u300120\u4eba\u301c40\u4eba\u53ef\uff09"] },
      { label: "\u7981\u7159\u30fb\u55ab\u7159", values: ["\u5168\u5e2d\u7981\u7159"] },
      { label: "\u99d0\u8eca\u5834", values: ["\u7121"] },
      {
        label: "\u7a7a\u9593\u30fb\u8a2d\u5099",
        values: [
          "\u843d\u3061\u7740\u3044\u305f\u7a7a\u9593\u3001\u30ab\u30a6\u30f3\u30bf\u30fc\u5e2d\u3042\u308a\u3001\u30bd\u30d5\u30a1\u30fc\u5e2d\u3042\u308a",
        ],
      },
      { label: "\u5e2d\u6570", values: ["38\u5e2d\uff08\u5168\u5e2d\u30c6\u30fc\u30d6\u30eb\uff09"] },
      { label: "\u6700\u5927\u4e88\u7d04\u53ef\u80fd\u4eba\u6570", values: ["\u7740\u5e2d\u6642 40\u4eba"] },
    ],
  },
  {
    id: "feature",
    title: "\u7279\u5fb4\u30fb\u95a2\u9023\u60c5\u5831",
    rows: [
      {
        label: "\u5229\u7528\u30b7\u30fc\u30f3",
        values: [
          "\u5bb6\u65cf\u30fb\u5b50\u4f9b \uff5c \u30c7\u30fc\u30c8",
          "\u3053\u3093\u306a\u6642\u306b\u3088\u304f\u4f7f\u308f\u308c\u307e\u3059\u3002",
        ],
      },
      {
        label: "\u304a\u5b50\u69d8\u9023\u308c",
        values: ["\u5b50\u4f9b\u53ef\uff08\u4e73\u5150\u53ef\u3001\u672a\u5c31\u5b66\u5150\u53ef\u3001\u5c0f\u5b66\u751f\u53ef\uff09"],
      },
      { label: "\u96fb\u8a71\u756a\u53f7", values: [RESTAURANT_INFO.phone] },
      {
        label: "\u5099\u8003",
        values: [
          "\u8cb8\u5207\u306e\u3054\u76f8\u8ac7\u3082\u627f\u3063\u3066\u304a\u308a\u307e\u3059\u3002",
          "\u304a\u96fb\u8a71\u3067\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044\u3002",
        ],
      },
    ],
  },
];

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
          <a href="#hero">{TEXT.navHome}</a>
          <a href="#recommendations">{TEXT.navRecommendations}</a>
          <a href="#best-sellers">{TEXT.navBestSellers}</a>
          <a href="#store-details">{TEXT.navDetails}</a>
          <a href="#access">{TEXT.navAccess}</a>
          <Link to="/admin" className="azuma-admin-link">
            {TEXT.navAdmin}
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
          {STORE_DETAIL_SECTIONS.map((section) => (
            <div className="azuma-detail-group" key={section.id}>
              <h3 className="azuma-detail-group-title">{section.title}</h3>
              <div className="azuma-detail-table">
                {section.rows.map((row) => (
                  <div className="azuma-detail-row" key={`${section.id}-${row.label}`}>
                    <div className="azuma-detail-label">{row.label}</div>
                    <div className="azuma-detail-value">
                      {row.values.map((value) => (
                        <p key={`${row.label}-${value}`}>{value}</p>
                      ))}
                      {row.mapEmbed && (
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
