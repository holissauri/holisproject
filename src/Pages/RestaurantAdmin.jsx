import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./RestaurantSite.css";
import { useAdminAuth } from "../restaurant/AdminAuthContext";
import {
  DEFAULT_BANNERS,
  DEFAULT_PRODUCTS,
  DEFAULT_STORE_DETAIL_SECTIONS,
  getStoredBanners,
  getStoredStoreDetails,
  getStoredProducts,
  saveBanners,
  saveStoreDetails,
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

const IMAGE_MAX_SIZE_MB = 5;
const IMAGE_MAX_BYTES = IMAGE_MAX_SIZE_MB * 1024 * 1024;

const JP = {
  adminPanel: "\u7ba1\u7406\u30d1\u30cd\u30eb",
  adminTitle: "\u3042\u305a\u307e\u98df\u5802 \u7ba1\u7406\u753b\u9762",
  backToSite: "\u30b5\u30a4\u30c8\u3078\u623b\u308b",
  logout: "\u30ed\u30b0\u30a2\u30a6\u30c8",
  totalProducts: "\u5546\u54c1\u6570",
  totalBanners: "\u30d0\u30ca\u30fc\u6570",
  activeBanners: "\u516c\u958b\u4e2d\u30d0\u30ca\u30fc",
  productManagement: "\u5546\u54c1\u7ba1\u7406",
  bannerManagement: "\u30d0\u30ca\u30fc\u7ba1\u7406",
  storeDetailsManagement: "\u5e97\u8217\u60c5\u5831\u7ba1\u7406",
  addProduct: "\u5546\u54c1\u3092\u8ffd\u52a0",
  editProduct: "\u5546\u54c1\u3092\u7de8\u96c6",
  productName: "\u5546\u54c1\u540d",
  categoryPlaceholder: "\u30ab\u30c6\u30b4\u30ea\uff08\u4f8b\uff1a\u304a\u3064\u307e\u307f\uff09",
  description: "\u7c21\u5358\u306a\u8aac\u660e",
  price: "\u4fa1\u683c\uff08\u5186\uff09",
  imageUrl: "\u753b\u50cfURL",
  productImageTools: "\u5546\u54c1\u753b\u50cf\u306e\u7ba1\u7406",
  bannerImageTools: "\u30d0\u30ca\u30fc\u753b\u50cf\u306e\u7ba1\u7406",
  removeImage: "\u753b\u50cf\u3092\u524a\u9664",
  imagePreviewAlt: "\u753b\u50cf\u30d7\u30ec\u30d3\u30e5\u30fc",
  noImage: "\u753b\u50cf\u306a\u3057",
  imageHelp: `URL\u5165\u529b\u307e\u305f\u306f\u30d5\u30a1\u30a4\u30eb\u9078\u629e\u3067\u753b\u50cf\u3092\u8ffd\u52a0\u30fb\u5909\u66f4\u3067\u304d\u307e\u3059\uff08\u6700\u5927${IMAGE_MAX_SIZE_MB}MB\uff09\u3002`,
  showRecommendation: "\u304a\u3059\u3059\u3081\u306b\u8868\u793a",
  showBestSeller: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc\u306b\u8868\u793a",
  saveChanges: "\u5909\u66f4\u3092\u4fdd\u5b58",
  cancelEdit: "\u7de8\u96c6\u3092\u30ad\u30e3\u30f3\u30bb\u30eb",
  productList: "\u5546\u54c1\u4e00\u89a7",
  noProducts: "\u5546\u54c1\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002",
  noDescription: "\u8aac\u660e\u306a\u3057\u3002",
  recommended: "\u304a\u3059\u3059\u3081",
  hidden: "\u975e\u8868\u793a",
  bestSeller: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc",
  normalMenu: "\u901a\u5e38\u30e1\u30cb\u30e5\u30fc",
  edit: "\u7de8\u96c6",
  delete: "\u524a\u9664",
  removeProductImage: "\u753b\u50cf\u524a\u9664",
  addBanner: "\u30d0\u30ca\u30fc\u3092\u8ffd\u52a0",
  editBanner: "\u30d0\u30ca\u30fc\u3092\u7de8\u96c6",
  bannerTitle: "\u30d0\u30ca\u30fc\u30bf\u30a4\u30c8\u30eb",
  subtitle: "\u30b5\u30d6\u30bf\u30a4\u30c8\u30eb",
  bannerImageUrl: "\u30d0\u30ca\u30fc\u753b\u50cfURL",
  buttonText: "\u30dc\u30bf\u30f3\u6587\u8a00",
  linkPlaceholder: "\u30ea\u30f3\u30af\u5148\uff08\u4f8b\uff1a#best-sellers\uff09",
  isActive: "\u516c\u958b\u4e2d",
  bannerList: "\u30d0\u30ca\u30fc\u4e00\u89a7",
  noBanners: "\u30d0\u30ca\u30fc\u306f\u307e\u3060\u3042\u308a\u307e\u305b\u3093\u3002",
  noSubtitle: "\u30b5\u30d6\u30bf\u30a4\u30c8\u30eb\u306a\u3057\u3002",
  active: "\u516c\u958b\u4e2d",
  inactive: "\u975e\u516c\u958b",
  deactivate: "\u975e\u516c\u958b\u306b\u3059\u308b",
  activate: "\u516c\u958b\u3059\u308b",
  removeBannerImage: "\u753b\u50cf\u524a\u9664",
  storeDetailsEditor: "\u5e97\u8217\u8a73\u7d30\u60c5\u5831\u3092\u7de8\u96c6",
  storeDetailsHelp:
    "\u5404\u9805\u76ee\u306e\u30e9\u30d9\u30eb\u3068\u5185\u5bb9\u3092\u5909\u66f4\u3067\u304d\u307e\u3059\u3002\u5185\u5bb9\u306f1\u884c\u305a\u3064\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
  sectionTitle: "\u30bb\u30af\u30b7\u30e7\u30f3\u30bf\u30a4\u30c8\u30eb",
  itemLabel: "\u9805\u76ee\u540d",
  itemValues: "\u5185\u5bb9\uff081\u884c\u305a\u3064\uff09",
  showMap: "\u5730\u56f3\u3092\u8868\u793a",
  saveStoreDetails: "\u5e97\u8217\u60c5\u5831\u3092\u4fdd\u5b58",
  resetStoreDetails: "\u4fdd\u5b58\u524d\u306e\u72b6\u614b\u306b\u623b\u3059",
  restoreDefaults: "\u521d\u671f\u5024\u306b\u623b\u3059",
  alertPickImage: "\u753b\u50cf\u30d5\u30a1\u30a4\u30eb\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
  alertImageSize: `\u753b\u50cf\u30b5\u30a4\u30ba\u306f ${IMAGE_MAX_SIZE_MB}MB \u4ee5\u4e0b\u306b\u3057\u3066\u304f\u3060\u3055\u3044\u3002`,
  alertImageReadFail: "\u753b\u50cf\u306e\u8aad\u307f\u8fbc\u307f\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002",
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

const cloneStoreDetails = (sections) =>
  (Array.isArray(sections) ? sections : []).map((section, sectionIndex) => ({
    id:
      typeof section?.id === "string" && section.id.trim()
        ? section.id
        : `section-${sectionIndex + 1}`,
    title: typeof section?.title === "string" ? section.title : "",
    rows: (Array.isArray(section?.rows) ? section.rows : []).map((row) => ({
      label: typeof row?.label === "string" ? row.label : "",
      values: Array.isArray(row?.values) ? [...row.values] : [String(row?.values || "")],
      mapEmbed: Boolean(row?.mapEmbed),
    })),
  }));

function RestaurantAdmin() {
  const { logout } = useAdminAuth();
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [banners, setBanners] = useState(DEFAULT_BANNERS);
  const [storeDetails, setStoreDetails] = useState(DEFAULT_STORE_DETAIL_SECTIONS);
  const [storeDetailsDraft, setStoreDetailsDraft] = useState(() =>
    cloneStoreDetails(DEFAULT_STORE_DETAIL_SECTIONS),
  );
  const [isHydrated, setIsHydrated] = useState(false);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [bannerForm, setBannerForm] = useState(emptyBannerForm);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editingBannerId, setEditingBannerId] = useState(null);
  const [activePanel, setActivePanel] = useState("product");

  useEffect(() => {
    const loadedStoreDetails = getStoredStoreDetails();
    const normalizedStoreDetails = cloneStoreDetails(loadedStoreDetails);
    const fallbackStoreDetails = cloneStoreDetails(DEFAULT_STORE_DETAIL_SECTIONS);
    const safeStoreDetails =
      normalizedStoreDetails.length > 0 ? normalizedStoreDetails : fallbackStoreDetails;
    setProducts(getStoredProducts());
    setBanners(getStoredBanners());
    setStoreDetails(safeStoreDetails);
    setStoreDetailsDraft(cloneStoreDetails(safeStoreDetails));
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

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    saveStoreDetails(storeDetails);
  }, [storeDetails, isHydrated]);

  const activeBannerCount = useMemo(
    () => banners.filter((banner) => banner.active).length,
    [banners],
  );

  const validateImageFile = (file) => {
    if (!file) {
      return false;
    }
    if (!file.type.startsWith("image/")) {
      window.alert(JP.alertPickImage);
      return false;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      window.alert(JP.alertImageSize);
      return false;
    }
    return true;
  };

  const handleProductImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!validateImageFile(file)) {
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setProductForm((previous) => ({ ...previous, imageUrl: dataUrl }));
    } catch {
      window.alert(JP.alertImageReadFail);
    }
  };

  const handleBannerImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!validateImageFile(file)) {
      return;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setBannerForm((previous) => ({ ...previous, imageUrl: dataUrl }));
    } catch {
      window.alert(JP.alertImageReadFail);
    }
  };

  const clearProductImageInForm = () => {
    setProductForm((previous) => ({ ...previous, imageUrl: "" }));
  };

  const clearBannerImageInForm = () => {
    setBannerForm((previous) => ({ ...previous, imageUrl: "" }));
  };

  const clearProductImageById = (productId) => {
    setProducts((previous) =>
      previous.map((item) =>
        item.id === productId ? { ...item, imageUrl: "" } : item,
      ),
    );
  };

  const clearBannerImageById = (bannerId) => {
    setBanners((previous) =>
      previous.map((item) =>
        item.id === bannerId ? { ...item, imageUrl: "" } : item,
      ),
    );
  };

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
    if (!bannerForm.title) {
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
      const newBanner = { ...bannerForm, id: `banner-${Date.now()}` };
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

  const handleDetailSectionTitleChange = (sectionIndex, value) => {
    setStoreDetailsDraft((previous) =>
      previous.map((section, index) =>
        index === sectionIndex ? { ...section, title: value } : section,
      ),
    );
  };

  const handleDetailRowLabelChange = (sectionIndex, rowIndex, value) => {
    setStoreDetailsDraft((previous) =>
      previous.map((section, currentSectionIndex) =>
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              rows: section.rows.map((row, currentRowIndex) =>
                currentRowIndex === rowIndex ? { ...row, label: value } : row,
              ),
            }
          : section,
      ),
    );
  };

  const handleDetailRowValuesChange = (sectionIndex, rowIndex, value) => {
    const nextValues = value.split(/\r?\n/);
    setStoreDetailsDraft((previous) =>
      previous.map((section, currentSectionIndex) =>
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              rows: section.rows.map((row, currentRowIndex) =>
                currentRowIndex === rowIndex ? { ...row, values: nextValues } : row,
              ),
            }
          : section,
      ),
    );
  };

  const handleDetailRowMapToggle = (sectionIndex, rowIndex, checked) => {
    setStoreDetailsDraft((previous) =>
      previous.map((section, currentSectionIndex) =>
        currentSectionIndex === sectionIndex
          ? {
              ...section,
              rows: section.rows.map((row, currentRowIndex) =>
                currentRowIndex === rowIndex ? { ...row, mapEmbed: checked } : row,
              ),
            }
          : section,
      ),
    );
  };

  const handleStoreDetailsSubmit = (event) => {
    event.preventDefault();
    setStoreDetails(cloneStoreDetails(storeDetailsDraft));
  };

  return (
    <main className="azuma-site azuma-admin">
      <header className="azuma-admin-top">
        <div>
          <p>{JP.adminPanel}</p>
          <h1>{JP.adminTitle}</h1>
        </div>
        <div className="azuma-admin-actions">
          <button type="button" className="azuma-logout-link" onClick={logout}>
            {JP.logout}
          </button>
          <Link to="/" className="azuma-back-link">
            {JP.backToSite}
          </Link>
        </div>
      </header>

      <section className="azuma-admin-stats">
        <div>
          <p>{JP.totalProducts}</p>
          <strong>{products.length}</strong>
        </div>
        <div>
          <p>{JP.totalBanners}</p>
          <strong>{banners.length}</strong>
        </div>
        <div>
          <p>{JP.activeBanners}</p>
          <strong>{activeBannerCount}</strong>
        </div>
      </section>

      <section className="azuma-admin-switcher">
        <button
          type="button"
          onClick={() => setActivePanel("product")}
          className={activePanel === "product" ? "active" : ""}
        >
          {JP.productManagement}
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("banner")}
          className={activePanel === "banner" ? "active" : ""}
        >
          {JP.bannerManagement}
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("details")}
          className={activePanel === "details" ? "active" : ""}
        >
          {JP.storeDetailsManagement}
        </button>
      </section>

      {activePanel === "product" && (
        <section className="azuma-admin-panel">
          <form className="azuma-form" onSubmit={handleProductSubmit}>
            <h2>{editingProductId ? JP.editProduct : JP.addProduct}</h2>
            <input
              placeholder={JP.productName}
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
              placeholder={JP.categoryPlaceholder}
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
              placeholder={JP.description}
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
              placeholder={JP.price}
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
              placeholder={JP.imageUrl}
              value={productForm.imageUrl}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  imageUrl: event.target.value,
                }))
              }
            />

            <div className="azuma-image-tools">
              <p>{JP.productImageTools}</p>
              <div className="azuma-upload-row">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageUpload}
                  className="azuma-upload-input"
                />
                <button type="button" className="ghost" onClick={clearProductImageInForm}>
                  {JP.removeImage}
                </button>
              </div>
              <div className="azuma-thumb-preview">
                {productForm.imageUrl ? (
                  <img src={productForm.imageUrl} alt={JP.imagePreviewAlt} className="azuma-thumb" />
                ) : (
                  <div className="azuma-thumb-placeholder">{JP.noImage}</div>
                )}
              </div>
              <small>{JP.imageHelp}</small>
            </div>

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
                {JP.showRecommendation}
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
                {JP.showBestSeller}
              </label>
            </div>
            <div className="azuma-form-actions">
              <button type="submit">{editingProductId ? JP.saveChanges : JP.addProduct}</button>
              {editingProductId && (
                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    setEditingProductId(null);
                    setProductForm(emptyProductForm);
                  }}
                >
                  {JP.cancelEdit}
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>{JP.productList}</h2>
            {products.length === 0 && <p>{JP.noProducts}</p>}
            {products.map((product) => (
              <article key={product.id}>
                <div className="azuma-list-body">
                  <div className="azuma-list-media">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="azuma-thumb-placeholder">{JP.noImage}</div>
                    )}
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>{`${product.category} | ¥${Number(product.price).toLocaleString("ja-JP")}`}</p>
                    <p>{product.description || JP.noDescription}</p>
                    <small>
                      {product.recommended ? JP.recommended : JP.hidden} |{" "}
                      {product.bestSeller ? JP.bestSeller : JP.normalMenu}
                    </small>
                  </div>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleProductEdit(product)}>
                    {JP.edit}
                  </button>
                  <button
                    type="button"
                    className="warn"
                    onClick={() => clearProductImageById(product.id)}
                  >
                    {JP.removeProductImage}
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
                    {JP.delete}
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
            <h2>{editingBannerId ? JP.editBanner : JP.addBanner}</h2>
            <input
              placeholder={JP.bannerTitle}
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
              placeholder={JP.subtitle}
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
              placeholder={JP.bannerImageUrl}
              value={bannerForm.imageUrl}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  imageUrl: event.target.value,
                }))
              }
            />
            <div className="azuma-image-tools">
              <p>{JP.bannerImageTools}</p>
              <div className="azuma-upload-row">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerImageUpload}
                  className="azuma-upload-input"
                />
                <button type="button" className="ghost" onClick={clearBannerImageInForm}>
                  {JP.removeImage}
                </button>
              </div>
              <div className="azuma-thumb-preview">
                {bannerForm.imageUrl ? (
                  <img src={bannerForm.imageUrl} alt={JP.imagePreviewAlt} className="azuma-thumb" />
                ) : (
                  <div className="azuma-thumb-placeholder">{JP.noImage}</div>
                )}
              </div>
              <small>{JP.imageHelp}</small>
            </div>
            <input
              placeholder={JP.buttonText}
              value={bannerForm.ctaText}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  ctaText: event.target.value,
                }))
              }
            />
            <input
              placeholder={JP.linkPlaceholder}
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
              {JP.isActive}
            </label>
            <div className="azuma-form-actions">
              <button type="submit">{editingBannerId ? JP.saveChanges : JP.addBanner}</button>
              {editingBannerId && (
                <button
                  type="button"
                  className="ghost"
                  onClick={() => {
                    setEditingBannerId(null);
                    setBannerForm(emptyBannerForm);
                  }}
                >
                  {JP.cancelEdit}
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>{JP.bannerList}</h2>
            {banners.length === 0 && <p>{JP.noBanners}</p>}
            {banners.map((banner) => (
              <article key={banner.id}>
                <div className="azuma-list-body">
                  <div className="azuma-list-media">
                    {banner.imageUrl ? (
                      <img src={banner.imageUrl} alt={banner.title} />
                    ) : (
                      <div className="azuma-thumb-placeholder">{JP.noImage}</div>
                    )}
                  </div>
                  <div>
                    <h3>{banner.title}</h3>
                    <p>{banner.subtitle || JP.noSubtitle}</p>
                    <small>{banner.active ? JP.active : JP.inactive}</small>
                  </div>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleBannerEdit(banner)}>
                    {JP.edit}
                  </button>
                  <button
                    type="button"
                    className="warn"
                    onClick={() => clearBannerImageById(banner.id)}
                  >
                    {JP.removeBannerImage}
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
                    {banner.active ? JP.deactivate : JP.activate}
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
                    {JP.delete}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activePanel === "details" && (
        <section className="azuma-admin-panel azuma-admin-panel-single">
          <form className="azuma-form azuma-details-form" onSubmit={handleStoreDetailsSubmit}>
            <h2>{JP.storeDetailsEditor}</h2>
            <p className="azuma-details-help">{JP.storeDetailsHelp}</p>

            {storeDetailsDraft.map((section, sectionIndex) => (
              <fieldset className="azuma-details-fieldset" key={section.id}>
                <legend>{section.id}</legend>
                <label className="azuma-details-label">{JP.sectionTitle}</label>
                <input
                  value={section.title}
                  onChange={(event) =>
                    handleDetailSectionTitleChange(sectionIndex, event.target.value)
                  }
                />

                {section.rows.map((row, rowIndex) => (
                  <div className="azuma-details-row" key={`${section.id}-${rowIndex}`}>
                    <label className="azuma-details-label">{JP.itemLabel}</label>
                    <input
                      value={row.label}
                      onChange={(event) =>
                        handleDetailRowLabelChange(sectionIndex, rowIndex, event.target.value)
                      }
                    />
                    <label className="azuma-details-label">{JP.itemValues}</label>
                    <textarea
                      rows={Math.max(3, row.values.length + 1)}
                      value={row.values.join("\n")}
                      onChange={(event) =>
                        handleDetailRowValuesChange(sectionIndex, rowIndex, event.target.value)
                      }
                    />
                    <label className="azuma-single-check">
                      <input
                        type="checkbox"
                        checked={Boolean(row.mapEmbed)}
                        onChange={(event) =>
                          handleDetailRowMapToggle(
                            sectionIndex,
                            rowIndex,
                            event.target.checked,
                          )
                        }
                      />
                      {JP.showMap}
                    </label>
                  </div>
                ))}
              </fieldset>
            ))}

            <div className="azuma-form-actions">
              <button type="submit">{JP.saveStoreDetails}</button>
              <button
                type="button"
                className="ghost"
                onClick={() => setStoreDetailsDraft(cloneStoreDetails(storeDetails))}
              >
                {JP.resetStoreDetails}
              </button>
              <button
                type="button"
                className="ghost"
                onClick={() =>
                  setStoreDetailsDraft(cloneStoreDetails(DEFAULT_STORE_DETAIL_SECTIONS))
                }
              >
                {JP.restoreDefaults}
              </button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

export default RestaurantAdmin;


