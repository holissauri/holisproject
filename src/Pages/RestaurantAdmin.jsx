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

const IMAGE_MAX_SIZE_MB = 5;
const IMAGE_MAX_BYTES = IMAGE_MAX_SIZE_MB * 1024 * 1024;

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });

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

  const handleProductImageUpload = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      window.alert("画像ファイルを選択してください。");
      return;
    }

    if (file.size > IMAGE_MAX_BYTES) {
      window.alert(`画像サイズは ${IMAGE_MAX_SIZE_MB}MB 以下にしてください。`);
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(file);
      setProductForm((previous) => ({
        ...previous,
        imageUrl: dataUrl,
      }));
    } catch {
      window.alert("画像の読み込みに失敗しました。");
    }
  };

  const clearProductImageInForm = () => {
    setProductForm((previous) => ({
      ...previous,
      imageUrl: "",
    }));
  };

  const clearProductImageById = (productId) => {
    setProducts((previous) =>
      previous.map((item) =>
        item.id === productId ? { ...item, imageUrl: "" } : item,
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
          <p>管理パネル</p>
          <h1>あずま食堂 管理画面</h1>
        </div>
        <Link to="/" className="azuma-back-link">
          サイトへ戻る
        </Link>
      </header>

      <section className="azuma-admin-stats">
        <div>
          <p>商品数</p>
          <strong>{products.length}</strong>
        </div>
        <div>
          <p>バナー数</p>
          <strong>{banners.length}</strong>
        </div>
        <div>
          <p>公開中バナー</p>
          <strong>{activeBannerCount}</strong>
        </div>
      </section>

      <section className="azuma-admin-switcher">
        <button
          type="button"
          onClick={() => setActivePanel("product")}
          className={activePanel === "product" ? "active" : ""}
        >
          商品管理
        </button>
        <button
          type="button"
          onClick={() => setActivePanel("banner")}
          className={activePanel === "banner" ? "active" : ""}
        >
          バナー管理
        </button>
      </section>

      {activePanel === "product" && (
        <section className="azuma-admin-panel">
          <form className="azuma-form" onSubmit={handleProductSubmit}>
            <h2>{editingProductId ? "商品を編集" : "商品を追加"}</h2>
            <input
              placeholder="商品名"
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
              placeholder="カテゴリ（例：おつまみ）"
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
              placeholder="簡単な説明"
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
              placeholder="価格（円）"
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
              placeholder="画像URL"
              value={productForm.imageUrl}
              onChange={(event) =>
                setProductForm((previous) => ({
                  ...previous,
                  imageUrl: event.target.value,
                }))
              }
            />

            <div className="azuma-image-tools">
              <p>商品画像の管理</p>
              <div className="azuma-upload-row">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductImageUpload}
                  className="azuma-upload-input"
                />
                <button type="button" className="ghost" onClick={clearProductImageInForm}>
                  画像を削除
                </button>
              </div>
              <div className="azuma-thumb-preview">
                {productForm.imageUrl ? (
                  <img src={productForm.imageUrl} alt="商品画像プレビュー" className="azuma-thumb" />
                ) : (
                  <div className="azuma-thumb-placeholder">画像なし</div>
                )}
              </div>
              <small>URL入力またはファイル選択で画像を追加・変更できます（最大5MB）。</small>
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
                おすすめに表示
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
                人気メニューに表示
              </label>
            </div>
            <div className="azuma-form-actions">
              <button type="submit">
                {editingProductId ? "変更を保存" : "商品を追加"}
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
                  編集をキャンセル
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>商品一覧</h2>
            {products.length === 0 && <p>商品はまだありません。</p>}
            {products.map((product) => (
              <article key={product.id}>
                <div className="azuma-list-body">
                  <div className="azuma-list-media">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <div className="azuma-thumb-placeholder">画像なし</div>
                    )}
                  </div>
                  <div>
                    <h3>{product.name}</h3>
                    <p>{`${product.category} | ¥${Number(product.price).toLocaleString("ja-JP")}`}</p>
                    <p>{product.description || "説明なし。"}</p>
                    <small>
                      {product.recommended ? "おすすめ" : "非表示"} |{" "}
                      {product.bestSeller ? "人気メニュー" : "通常メニュー"}
                    </small>
                  </div>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleProductEdit(product)}>
                    編集
                  </button>
                  <button
                    type="button"
                    className="warn"
                    onClick={() => clearProductImageById(product.id)}
                  >
                    画像削除
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
                    削除
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
            <h2>{editingBannerId ? "バナーを編集" : "バナーを追加"}</h2>
            <input
              placeholder="バナータイトル"
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
              placeholder="サブタイトル"
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
              placeholder="バナー画像URL"
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
              placeholder="ボタン文言"
              value={bannerForm.ctaText}
              onChange={(event) =>
                setBannerForm((previous) => ({
                  ...previous,
                  ctaText: event.target.value,
                }))
              }
            />
            <input
              placeholder="リンク先（例：#best-sellers）"
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
              公開中
            </label>
            <div className="azuma-form-actions">
              <button type="submit">
                {editingBannerId ? "変更を保存" : "バナーを追加"}
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
                  編集をキャンセル
                </button>
              )}
            </div>
          </form>

          <div className="azuma-list">
            <h2>バナー一覧</h2>
            {banners.length === 0 && <p>バナーはまだありません。</p>}
            {banners.map((banner) => (
              <article key={banner.id}>
                <div>
                  <h3>{banner.title}</h3>
                  <p>{banner.subtitle || "サブタイトルなし。"}</p>
                  <small>{banner.active ? "公開中" : "非公開"}</small>
                </div>
                <div className="azuma-inline-actions">
                  <button type="button" onClick={() => handleBannerEdit(banner)}>
                    編集
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
                    {banner.active ? "非公開にする" : "公開する"}
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
                    削除
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
