const STORAGE_KEYS = {
  banners: "azuma_restaurant_banners_v1",
  products: "azuma_restaurant_products_v1",
};

export const RESTAURANT_INFO = {
  name: "\u3042\u305a\u307e\u98df\u5802 (Azuma Shokudo)",
  subtitle: "\u9d28\u5ddd\u306e\u30ed\u30fc\u30ab\u30eb\u5c45\u9152\u5c4b / Kamogawa Local Izakaya",
  address: "921-2 Hiroba, Kamogawa, Chiba 296-0044",
  phone: "04-7093-5525",
  openHours: "17:30 - 23:00 (Fri opens at 17:30)",
  mapsLink: "https://maps.google.com/?q=921-2+Hiroba+Kamogawa+Chiba+296-0044",
};

export const DEFAULT_BANNERS = [
  {
    id: "banner-1",
    title: "\u6696\u304b\u3044\u591c\u3068\u672c\u683c\u6599\u7406 / Warm Nights, Authentic Plates",
    subtitle:
      "A cozy Kamogawa izakaya with local favorites and a welcoming night atmosphere.",
    imageUrl:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80",
    ctaText: "\u4e88\u7d04 / Reserve",
    ctaLink: "#access",
    active: true,
  },
  {
    id: "banner-2",
    title: "Great For Two / \u4e8c\u4eba\u3067\u697d\u3057\u3080\u304a\u3059\u3059\u3081",
    subtitle:
      "A balanced set of salad, otsumami, and agemono dishes made for sharing.",
    imageUrl:
      "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=1400&q=80",
    ctaText: "\u304a\u3059\u3059\u3081\u3092\u898b\u308b / View Picks",
    ctaLink: "#recommendations",
    active: true,
  },
  {
    id: "banner-3",
    title: "From Crispy Sides To Rice Bowls",
    subtitle: "Friendly pricing from 280 JPY with satisfying portions.",
    imageUrl:
      "https://images.unsplash.com/photo-1579887829114-9b6f8f44671b?auto=format&fit=crop&w=1400&q=80",
    ctaText: "\u4eba\u6c17\u30e1\u30cb\u30e5\u30fc / Best Sellers",
    ctaLink: "#best-sellers",
    active: true,
  },
];

export const DEFAULT_PRODUCTS = [
  {
    id: "product-1",
    name: "Kushikatsu Mix",
    category: "Agemono",
    description: "Mixed fried seafood and vegetables with house izakaya sauce.",
    price: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1596057208983-6c6d3f14f34a?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: true,
  },
  {
    id: "product-2",
    name: "Karikari Potato Salad",
    category: "Salad",
    description: "Crunchy potato salad topped with fresh seasonal vegetables.",
    price: 660,
    imageUrl:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: false,
  },
  {
    id: "product-3",
    name: "Negi Toro Yaki",
    category: "Otsumami",
    description: "Grilled tuna and scallion bites with savory smoky flavor.",
    price: 400,
    imageUrl:
      "https://images.unsplash.com/photo-1611143669185-af224c5e3252?auto=format&fit=crop&w=900&q=80",
    recommended: true,
    bestSeller: true,
  },
  {
    id: "product-4",
    name: "Yakisoba",
    category: "Gohanmono",
    description: "Classic Japanese stir-fried noodles with sweet-savory seasoning.",
    price: 580,
    imageUrl:
      "https://images.unsplash.com/photo-1623341214825-9f4f963727da?auto=format&fit=crop&w=900&q=80",
    recommended: false,
    bestSeller: true,
  },
  {
    id: "product-5",
    name: "Pork Kimchi Itame",
    category: "Otsumami",
    description: "Sauteed pork and kimchi with a balanced spicy finish.",
    price: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80",
    recommended: false,
    bestSeller: true,
  },
  {
    id: "product-6",
    name: "Gyukaru Don",
    category: "Gohanmono",
    description: "Warm rice bowl topped with beef kalbi, a regular-customer favorite.",
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
