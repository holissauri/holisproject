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
          <p>Admin Panel / \u7ba1\u7406\u30d1\u30cd\u30eb</p>
          <h1>Azuma Shokudo Website</h1>
        </div>
        <Link to="/" className="azuma-back-link">
          Back to Home
        </Link>
      </header>

      <section className="azuma-admin-stats">
        <div>
          <p>Total Products</p>
          <strong>{products.length}</strong>
        </div>
        <div>
          <p>Total Banners</p>
          <strong>{banners.length}</strong>
        </div>
        <div>
          <p>Active Banners</p>
          <strong>{activeBannerCount}</strong>
        </div>
      </section>

      <section className="azuma-admin-switcher">
        <button
          type="button"
          onClick={() => setActivePanel("product")}
          className={activePanel === "product" ? "active" : ""}
        >
          Product Management
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("banner")}
          className={activePanel === "banner" ? "active" : ""}
        >
          Banner Management
        </button>
      </section>

      {activePanel === "product" && (
        <section className="azuma-admin-panel">
          <form className="azuma-form" onSubmit={handleProductSubmit}>
            <h2>{editingProductId ? "Edit Product" : "Add Product"}</h2>
            <input
              placeholder="Product name"
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
              placeholder="Category (e.g., Otsumami)"
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
              placeholder="Short description"
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
              placeholder="Price (JPY)"
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
              placeholder="Image URL"
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
                Show in Recommendations
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
                Show in Best Sellers
              </label>
            </div>
            <div className="azuma-form-actions">
              <button type="submit">
                {editingProductId ? "Save Changes" : "Add Product"}
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
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>Product List</h2>
            {products.length === 0 && <p>No products yet.</p>}
            {products.map((product) => (
              <article key={product.id}>
                <div>
                  <h3>{product.name}</h3>
                  <p>{`${product.category} | JPY ${product.price}`}</p>
                  <p>{product.description || "No description."}</p>
                  <small>
                    {product.recommended ? "Recommended" : "Not Recommended"} |{" "}
                    {product.bestSeller ? "Best Seller" : "Not Best Seller"}
                  </small>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleProductEdit(product)}>
                    Edit
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
                    Delete
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
            <h2>{editingBannerId ? "Edit Banner" : "Add Banner"}</h2>
            <input
              placeholder="Banner title"
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
              placeholder="Subtitle"
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
              placeholder="Banner image URL"
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
              placeholder="CTA button text"
              value={bannerForm.ctaText}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  ctaText: event.target.value,
                }))
              }
            />
            <input
              placeholder="CTA link (e.g., #best-sellers)"
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
              Banner Active
            </label>
            <div className="azuma-form-actions">
              <button type="submit">
                {editingBannerId ? "Save Changes" : "Add Banner"}
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
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>Banner List</h2>
            {banners.length === 0 && <p>No banners yet.</p>}
            {banners.map((banner) => (
              <article key={banner.id}>
                <div>
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle || "No subtitle."}</p>
                  <small>{banner.active ? "Active" : "Inactive"}</small>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleBannerEdit(banner)}>
                    Edit
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
                    {banner.active ? "Deactivate" : "Activate"}
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
                    Delete
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
