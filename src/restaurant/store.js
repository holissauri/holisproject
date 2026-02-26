const STORAGE_KEYS = {
  banners: "azuma_restaurant_banners_v1",
  products: "azuma_restaurant_products_v1",
  storeDetails: "azuma_restaurant_store_details_v1",
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

export const DEFAULT_STORE_DETAIL_SECTIONS = [
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
      {
        label: "\u4e88\u7b97\uff08\u53e3\u30b3\u30df\u96c6\u8a08\uff09",
        values: ["\u00a53,000\u301c\u00a54,999"],
      },
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
      {
        label: "\u8cb8\u5207",
        values: ["\u53ef\uff0820\u4eba\u4ee5\u4e0b\u53ef\u300120\u4eba\u301c40\u4eba\u53ef\uff09"],
      },
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

export const getStoredStoreDetails = () =>
  parseStoredJSON(STORAGE_KEYS.storeDetails, DEFAULT_STORE_DETAIL_SECTIONS);

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

export const saveStoreDetails = (storeDetails) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(
    STORAGE_KEYS.storeDetails,
    JSON.stringify(storeDetails),
  );
};
