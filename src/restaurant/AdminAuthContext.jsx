import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  isAdminUser,
  isAllowlistConfigured,
  loginAdmin,
  logoutAdmin,
  mapAuthError,
  subscribeAdminAuth,
} from "./adminAuth";

const AdminAuthContext = createContext(null);

function AdminAuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeAdminAuth((nextUser) => {
      if (nextUser && !isAdminUser(nextUser)) {
        logoutAdmin().catch(() => {});
        setUser(null);
        setLoading(false);
        return;
      }
      setUser(nextUser || null);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAllowed: Boolean(user && isAdminUser(user)),
      isAllowlistConfigured,
      login: loginAdmin,
      logout: logoutAdmin,
      mapError: mapAuthError,
    }),
    [user, loading],
  );

  return (
    <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
  );
}

const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};

export { AdminAuthProvider, useAdminAuth };
