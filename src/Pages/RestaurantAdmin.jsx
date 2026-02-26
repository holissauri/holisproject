import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./RestaurantSite.css";
import {
  DEFAULT_BANNERS,
  DEFAULT_PRODUCTS,
  getStoredBanners,
  getStoredProducts,
  saveBanners,
  saveProducts,
} from "../restaurant/store";

const emptyProductForm = {
  name: "",
  category: "",
  description: "",
  price: "",
  imageUrl: "",
  recommended: false,
  bestSeller: false,
};

const emptyBannerForm = {
  title: "",
  subtitle: "",
  imageUrl: "",
  ctaText: "",
  ctaLink: "",
  active: true,
};

function RestaurantAdmin() {
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [isHydrated, setIsHydrated] = useState(false);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [bannerForm, setBannerForm] = useState(emptyBannerForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [activePanel, setActivePanel] = useState("product");

  useEffect(() => {
    setProducts(getStoredProducts());
    setBanners(getStoredBanners());
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    saveProducts(products);
  }, [products, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    saveBanners(banners);
  }, [banners, isHydrated]);

  const activeBannerCount = useMemo(
    () => banners.filter((banner) => banner.active).length,
    [banners],
  );

  const handleProductSubmit = (event) => {
    event.preventDefault();

    const normalizedPrice = Number(productForm.price);
    if (!productForm.name || !productForm.category || Number.isNaN(normalizedPrice)) {
      return;
    }

    if (editingProductId) {
      setProducts((previous) =>
        previous.map((item) =>
          item.id === editingProductId
            ? { ...item, ...productForm, price: normalizedPrice }
            : item,
        ),
      );
      setEditingProductId(null);
    } else {
      const newProduct = {
        ...productForm,
        id: `product-${Date.now()}`,
        price: normalizedPrice,
      };
      setProducts((previous) => [newProduct, ...previous]);
    }

    setProductForm(emptyProductForm);
  };

  const handleBannerSubmit = (event) => {
    event.preventDefault();
    if (!bannerForm.title || !bannerForm.imageUrl) {
      return;
    }

    if (editingBannerId) {
      setBanners((previous) =>
        previous.map((item) =>
          item.id === editingBannerId ? { ...item, ...bannerForm } : item,
        ),
      );
      setEditingBannerId(null);
    } else {
      const newBanner = {
        ...bannerForm,
        id: `banner-${Date.now()}`,
      };
      setBanners((previous) => [newBanner, ...previous]);
    }

    setBannerForm(emptyBannerForm);
  };

  const handleProductEdit = (product) => {
    setProductForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      recommended: product.recommended,
      bestSeller: product.bestSeller,
    });
    setEditingProductId(product.id);
    setActivePanel("product");
  };

  const handleBannerEdit = (banner) => {
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle,
      imageUrl: banner.imageUrl,
      ctaText: banner.ctaText,
      ctaLink: banner.ctaLink,
      active: banner.active,
    });
    setEditingBannerId(banner.id);
    setActivePanel("banner");
  };

  return (
    <main className="azuma-site azuma-admin">
      <header className="azuma-admin-top">
        <div>
          <p>\u7ba1\u7406\u30d1\u30cd\u30eb</p>
          <h1>\u3042\u305a\u307e\u98df\u5802 \u7ba1\u7406\u753b\u9762</h1>
        </div>
        <Link to="/" className="azuma-back-link">
          \u30b5\u30a4\u30c8\u3078\u623b\u308b
        </Link>
      </header>

      <section className="azuma-admin-stats">
        <div>
          <p>\u5546\u54c1\u6570</p>
          <strong>{products.length}</strong>
        </div>
        <div>
          <p>\u30d0\u30ca\u30fc\u6570</p>
          <strong>{banners.length}</strong>
        </div>
        <div>
          <p>\u516c\u958b\u4e2d\u30d0\u30ca\u30fc</p>
          <strong>{activeBannerCount}</strong>
        </div>
      </section>

      <section className="azuma-admin-switcher">
        <button
          type="button"
          onClick={() => setActivePanel("product")}
          className={activePanel === "product" ? "active" : ""}
        >
          \u5546\u54c1\u7ba1\u7406
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("banner")}
          className={activePanel === "banner" ? "active" : ""}
        >
          \u30d0\u30ca\u30fc\u7ba1\u7406
        </button>
      </section>

      {activePanel === "product" && (
        <section className="azuma-admin-panel">
          <form className="azuma-form" onSubmit={handleProductSubmit}>
            <h2>{editingProductId ? "\u5546\u54c1\u3092\u7de8\u96c6" : "\u5546\u54c1\u3092\u8ffd\u52a0"}</h2>
            <input
              placeholder="\u5546\u54c1\u540d"
              value={productForm.name}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              required
            />
            <input
              placeholder="\u30ab\u30c6\u30b4\u30ea\uff08\u4f8b\uff1a\u304a\u3064\u307e\u307f\uff09"
              value={productForm.category}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  category: event.target.value,
                }))
              }
              required
            />
            <textarea
              placeholder="\u7c21\u5358\u306a\u8aac\u660e"
              value={productForm.description}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  description: event.target.value,
                }))
              }
              rows={3}
            />
            <input
              placeholder="\u4fa1\u683c\uff08\u5186\uff09"
              type="number"
              min="0"
              value={productForm.price}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  price: event.target.value,
                }))
              }
              required
            />
            <input
              placeholder="\u753b\u50cf\u30ea\u30f3\u30af"
              value={productForm.imageUrl}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  imageUrl: event.target.value,
                }))
              }
            />
            <div className="azuma-check-row">
              <label>
                <input
                  type="checkbox"
                  checked={productForm.recommended}
                  onChange={(event) =>
                    setProductForm((previous) => ({
                      ...previous,
                      recommended: event.target.checked,
                    }))
                  }
                />
                \u304a\u3059\u3059\u3081\u306b\u8868\u793a
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={productForm.bestSeller}
                  onChange={(event) =>
                    setProductForm((previous) => ({
                      ...previous,
                      bestSeller: event.target.checked,
                    }))
                  }
                />
                \u4eba\u6c17\u30e1\u30cb\u30e5\u30fc\u306b\u8868\u793a
              </label>
            </div>
            <div className="azuma-form-actions">
              <button type="submit">
                {editingProductId ? "\u5909\u66f4\u3092\u4fdd\u5b58" : "\u5546\u54c1\u3092\u8ffd\u52a0"}
              </button>
              {editingProductId && (
                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm(emptyProductForm);
                  }}
                >
                  \u7de8\u96c6\u3092\u30ad\u30e3\u30f3\u30bb\u30eb
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>\u5546\u54c1\u4e00\u89a7</h2>
            {products.length === 0 && <p>\u5546\u54c1\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002</p>}
            {products.map((product) => (
              <article key={product.id}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{`${product.category} | \uFFE5${product.price}`}</p>
                  <p>{product.description || "\u8aac\u660e\u306a\u3057\u3002"}</p>
                  <small>
                    {product.recommended ? "\u304a\u3059\u3059\u3081" : "\u975e\u8868\u793a"} |{" "}
                    {product.bestSeller ? "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc" : "\u901a\u5e38\u30e1\u30cb\u30e5\u30fc"}
                  </small>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleProductEdit(product)}>
                    \u7de8\u96c6
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() =>
                      setProducts((previous) =>
                        previous.filter((item) => item.id !== product.id),
                      )
                    }
                  >
                    \u524a\u9664
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activePanel === "banner" && (
        <section className="azuma-admin-panel">
          <form className="azuma-form" onSubmit={handleBannerSubmit}>
            <h2>{editingBannerId ? "\u30d0\u30ca\u30fc\u3092\u7de8\u96c6" : "\u30d0\u30ca\u30fc\u3092\u8ffd\u52a0"}</h2>
            <input
              placeholder="\u30d0\u30ca\u30fc\u30bf\u30a4\u30c8\u30eb"
              value={bannerForm.title}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  title: event.target.value,
                }))
              }
              required
            />
            <textarea
              placeholder="\u30b5\u30d6\u30bf\u30a4\u30c8\u30eb"
              value={bannerForm.subtitle}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  subtitle: event.target.value,
                }))
              }
              rows={3}
            />
            <input
              placeholder="\u30d0\u30ca\u30fc\u753b\u50cf\u30ea\u30f3\u30af"
              value={bannerForm.imageUrl}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  imageUrl: event.target.value,
                }))
              }
              required
            />
            <input
              placeholder="\u30dc\u30bf\u30f3\u6587\u8a00"
              value={bannerForm.ctaText}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  ctaText: event.target.value,
                }))
              }
            />
            <input
              placeholder="\u30ea\u30f3\u30af\u5148\uff08\u4f8b\uff1a#best-sellers\uff09"
              value={bannerForm.ctaLink}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  ctaLink: event.target.value,
                }))
              }
            />
            <label className="azuma-single-check">
              <input
                type="checkbox"
                checked={bannerForm.active}
                onChange={(event) =>
                  setBannerForm((previous) => ({
                    ...previous,
                    active: event.target.checked,
                  }))
                }
              />
              \u516c\u958b\u4e2d
            </label>
            <div className="azuma-form-actions">
              <button type="submit">
                {editingBannerId ? "\u5909\u66f4\u3092\u4fdd\u5b58" : "\u30d0\u30ca\u30fc\u3092\u8ffd\u52a0"}
              </button>
              {editingBannerId && (
                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    setEditingBannerId(null);
                    setBannerForm(emptyBannerForm);
                  }}
                >
                  \u7de8\u96c6\u3092\u30ad\u30e3\u30f3\u30bb\u30eb
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>\u30d0\u30ca\u30fc\u4e00\u89a7</h2>
            {banners.length === 0 && <p>\u30d0\u30ca\u30fc\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002</p>}
            {banners.map((banner) => (
              <article key={banner.id}>
                <div>
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle || "\u30b5\u30d6\u30bf\u30a4\u30c8\u30eb\u306a\u3057\u3002"}</p>
                  <small>{banner.active ? "\u516c\u958b\u4e2d" : "\u975e\u516c\u958b"}</small>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleBannerEdit(banner)}>
                    \u7de8\u96c6
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setBanners((previous) =>
                        previous.map((item) =>
                          item.id === banner.id
                            ? { ...item, active: !item.active }
                            : item,
                        ),
                      )
                    }
                  >
                    {banner.active ? "\u975e\u516c\u958b\u306b\u3059\u308b" : "\u516c\u958b\u3059\u308b"}
                  </button>
                  <button
                    type="button"
                    className="danger"
                    onClick={() =>
                      setBanners((previous) =>
                        previous.filter((item) => item.id !== banner.id),
                      )
                    }
                  >
                    \u524a\u9664
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default RestaurantAdmin;
