const STORAGE_KEYS = {
  banners: "azuma_restaurant_banners_v1",
  products: "azuma_restaurant_products_v1",
};

export const RESTAURANT_INFO = {
  name: "\u3042\u305a\u307e\u98df\u5802",
  subtitle: "\u9d28\u5ddd\u306e\u30ed\u30fc\u30ab\u30eb\u5c45\u9152\u5c4b",
  address: "\u3012296-0044 \u5343\u8449\u770c\u9d28\u5ddd\u5e02\u5e83\u5834 921-2",
  phone: "04-7093-5525",
  openHours: "17:30 - 23:00\uff08\u91d1\u66dc\u65e5 17:30 \u958b\u5e97\uff09",
  mapsLink: "https://maps.google.com/?q=921-2+Hiroba+Kamogawa+Chiba+296-0044",
};

export const DEFAULT_BANNERS = [
  {
    id: "banner-1",
    title: "\u6e29\u304b\u3044\u591c\u306b\u3001\u3053\u3060\u308f\u308a\u306e\u4e00\u76bf\u3092\u3002",
    subtitle: "\u5730\u5143\u306b\u611b\u3055\u308c\u308b\u6599\u7406\u3068\u3001\u843d\u3061\u7740\u3044\u305f\u5c45\u9152\u5c4b\u306e\u96f0\u56f2\u6c17\u3092\u697d\u3057\u3081\u307e\u3059\u3002",
    imageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    ctaText: "\u3054\u4e88\u7d04",
    ctaLink: "#access",
    active: true,
  },
  {
    id: "banner-2",
    title: "\u4e8c\u540d\u69d8\u306b\u304a\u3059\u3059\u3081",
    subtitle: "\u30b5\u30e9\u30c0\u3001\u304a\u3064\u307e\u307f\u3001\u63da\u3052\u7269\u3092\u30d0\u30e9\u30f3\u30b9\u3088\u304f\u697d\u3057\u3081\u308b\u69cb\u6210\u3067\u3059\u3002",
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80",
    ctaText: "\u304a\u3059\u3059\u3081\u3092\u898b\u308b",
    ctaLink: "#recommendations",
    active: true,
  },
  {
    id: "banner-3",
    title: "\u63da\u3052\u7269\u304b\u3089\u3054\u98ef\u3082\u306e\u307e\u3067",
    subtitle: "280\u5186\u304b\u3089\u697d\u3057\u3081\u308b\u3001\u6e80\u8db3\u611f\u306e\u3042\u308b\u30e1\u30cb\u30e5\u30fc\u3002",
    imageUrl:
      "https://images.unsplash.com/photo-1579887829114-9b6f8f44671b?auto=format&fit=crop&w=1400&q=80",
    ctaText: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc",
    ctaLink: "#best-sellers",
    active: true,
  },
];

export const DEFAULT_PRODUCTS = [
  {
    id: "product-1",
    name: "\u4e32\u30ab\u30c4\u76db\u308a\u5408\u308f\u305b",
    category: "\u63da\u3052\u7269",
    description: "\u9b5a\u4ecb\u3068\u91ce\u83dc\u3092\u697d\u3057\u3081\u308b\u30b5\u30af\u30b5\u30af\u306e\u4e00\u76bf\u3002\u7279\u88fd\u30bd\u30fc\u30b9\u4ed8\u304d\u3002",
    price: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1596057208983-6c6d3f14f34a?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: true,
  },
  {
    id: "product-2",
    name: "\u30ab\u30ea\u30ab\u30ea\u30dd\u30c6\u30c8\u30b5\u30e9\u30c0",
    category: "\u30b5\u30e9\u30c0",
    description: "\u98df\u611f\u304c\u697d\u3057\u3044\u30dd\u30c6\u30c8\u30b5\u30e9\u30c0\u306b\u3001\u65b0\u9bae\u306a\u91ce\u83dc\u3092\u30c8\u30c3\u30d4\u30f3\u30b0\u3002",
    price: 660,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: false,
  },
  {
    id: "product-3",
    name: "\u30cd\u30ae\u30c8\u30ed\u713c\u304d",
    category: "\u304a\u3064\u307e\u307f",
    description: "\u307e\u3050\u308d\u3068\u30cd\u30ae\u306e\u65e8\u5473\u3092\u9999\u3070\u3057\u304f\u713c\u304d\u4e0a\u3052\u305f\u4eba\u6c17\u306e\u4e00\u54c1\u3002",
    price: 400,
    imageUrl:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: true,
  },
  {
    id: "product-4",
    name: "\u713c\u304d\u305d\u3070",
    category: "\u3054\u98ef\u3082\u306e",
    description: "\u9999\u3070\u3057\u3044\u30bd\u30fc\u30b9\u9999\u308b\u3001\u5b9a\u756a\u306e\u713c\u304d\u305d\u3070\u3002",
    price: 580,
    imageUrl:
      "https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&w=900&q=80",
    recommended: false,
    bestSeller: true,
  },
  {
    id: "product-5",
    name: "\u8c5a\u30ad\u30e0\u30c1\u7092\u3081",
    category: "\u304a\u3064\u307e\u307f",
    description: "\u8c5a\u8089\u3068\u30ad\u30e0\u30c1\u306e\u8f9b\u307f\u3068\u65e8\u5473\u304c\u3070\u3063\u3061\u308a\u5408\u3046\u4e00\u76bf\u3002",
    price: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    recommended: false,
    bestSeller: true,
  },
  {
    id: "product-6",
    name: "\u725b\u30ab\u30eb\u30d3\u4e3c",
    category: "\u3054\u98ef\u3082\u306e",
    description: "\u67d4\u3089\u304b\u3044\u725b\u30ab\u30eb\u30d3\u3092\u3054\u98ef\u3068\u4e00\u7dd2\u306b\u5473\u308f\u3046\u3001\u5e38\u9023\u306b\u4eba\u6c17\u306e\u4e00\u676f\u3002",
    price: 1350,
    imageUrl:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: true,
  },
];

const parseStoredJSON = (key, fallbackValue) => {
  if (typeof window === "undefined") {
    return fallbackValue;
  }

  const rawValue = window.localStorage.getItem(key);
  if (!rawValue) {
    return fallbackValue;
  }

  try {
    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : fallbackValue;
  } catch (error) {
    console.error(`Failed to parse ${key}`, error);
    return fallbackValue;
  }
};

export const getStoredBanners = () =>
  parseStoredJSON(STORAGE_KEYS.banners, DEFAULT_BANNERS);

export const getStoredProducts = () =>
  parseStoredJSON(STORAGE_KEYS.products, DEFAULT_PRODUCTS);

export const saveBanners = (banners) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEYS.banners, JSON.stringify(banners));
};

export const saveProducts = (products) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
};
