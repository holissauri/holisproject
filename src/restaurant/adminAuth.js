import { getApp, getApps, initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const DEFAULT_ADMIN_FIREBASE_CONFIG = {
  apiKey: "AIzaSyB-lfUt1adpQ0KYcFFW_oAWTJVfHDOOZy8",
  authDomain: "portofolio-web-3e8e8.firebaseapp.com",
  projectId: "portofolio-web-3e8e8",
  storageBucket: "portofolio-web-3e8e8.appspot.com",
  messagingSenderId: "25195509306",
  appId: "1:25195509306:web:2b635dcf997137bf612703",
};

const ADMIN_FIREBASE_CONFIG = {
  apiKey:
    import.meta.env.VITE_ADMIN_FIREBASE_API_KEY ||
    DEFAULT_ADMIN_FIREBASE_CONFIG.apiKey,
  authDomain:
    import.meta.env.VITE_ADMIN_FIREBASE_AUTH_DOMAIN ||
    DEFAULT_ADMIN_FIREBASE_CONFIG.authDomain,
  projectId:
    import.meta.env.VITE_ADMIN_FIREBASE_PROJECT_ID ||
    DEFAULT_ADMIN_FIREBASE_CONFIG.projectId,
  storageBucket:
    import.meta.env.VITE_ADMIN_FIREBASE_STORAGE_BUCKET ||
    DEFAULT_ADMIN_FIREBASE_CONFIG.storageBucket,
  messagingSenderId:
    import.meta.env.VITE_ADMIN_FIREBASE_MESSAGING_SENDER_ID ||
    DEFAULT_ADMIN_FIREBASE_CONFIG.messagingSenderId,
  appId:
    import.meta.env.VITE_ADMIN_FIREBASE_APP_ID ||
    DEFAULT_ADMIN_FIREBASE_CONFIG.appId,
};

const parseAllowedEmails = (rawValue) =>
  String(rawValue || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

const allowedAdminEmails = parseAllowedEmails(import.meta.env.VITE_ADMIN_EMAILS);

const adminApp = getApps().some((app) => app.name === "admin-auth-app")
  ? getApp("admin-auth-app")
  : initializeApp(ADMIN_FIREBASE_CONFIG, "admin-auth-app");

const adminAuth = getAuth(adminApp);
setPersistence(adminAuth, browserLocalPersistence).catch(() => {});

const isAllowlistConfigured = allowedAdminEmails.length > 0;

const isAdminUser = (user) => {
  if (!user?.email || !isAllowlistConfigured) {
    return false;
  }
  return allowedAdminEmails.includes(user.email.toLowerCase());
};

const mapAuthError = (error) => {
  const code = error?.code || error?.message || "";
  if (code === "auth/invalid-credential") {
    return "\u30e1\u30fc\u30eb\u30a2\u30c9\u30ec\u30b9\u307e\u305f\u306f\u30d1\u30b9\u30ef\u30fc\u30c9\u304c\u9055\u3044\u307e\u3059\u3002";
  }
  if (code === "auth/too-many-requests") {
    return "\u30ed\u30b0\u30a4\u30f3\u8a66\u884c\u304c\u591a\u3059\u304e\u307e\u3059\u3002\u5c11\u3057\u6642\u9593\u3092\u304a\u3044\u3066\u518d\u8a66\u884c\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
  }
  if (code === "auth/network-request-failed") {
    return "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u30a8\u30e9\u30fc\u304c\u767a\u751f\u3057\u307e\u3057\u305f\u3002\u63a5\u7d9a\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\u3002";
  }
  if (code === "ALLOWLIST_NOT_CONFIGURED") {
    return "\u7ba1\u7406\u8005\u30e1\u30fc\u30eb\u306e\u8a31\u53ef\u30ea\u30b9\u30c8\u304c\u672a\u8a2d\u5b9a\u3067\u3059\u3002";
  }
  if (code === "NOT_ALLOWED_ADMIN") {
    return "\u3053\u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u306b\u306f\u7ba1\u7406\u753b\u9762\u3078\u306e\u30a2\u30af\u30bb\u30b9\u6a29\u9650\u304c\u3042\u308a\u307e\u305b\u3093\u3002";
  }
  return "\u30ed\u30b0\u30a4\u30f3\u306b\u5931\u6557\u3057\u307e\u3057\u305f\u3002";
};

const loginAdmin = async ({ email, password }) => {
  if (!isAllowlistConfigured) {
    const allowlistError = new Error("ALLOWLIST_NOT_CONFIGURED");
    allowlistError.code = "ALLOWLIST_NOT_CONFIGURED";
    throw allowlistError;
  }

  const credential = await signInWithEmailAndPassword(adminAuth, email, password);
  if (!isAdminUser(credential.user)) {
    await signOut(adminAuth);
    const roleError = new Error("NOT_ALLOWED_ADMIN");
    roleError.code = "NOT_ALLOWED_ADMIN";
    throw roleError;
  }
  return credential.user;
};

const logoutAdmin = () => signOut(adminAuth);

const subscribeAdminAuth = (callback) => onAuthStateChanged(adminAuth, callback);

export {
  allowedAdminEmails,
  isAdminUser,
  isAllowlistConfigured,
  loginAdmin,
  logoutAdmin,
  mapAuthError,
  subscribeAdminAuth,
};
