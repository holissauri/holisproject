import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function ProtectedAdminRoute({ children }) {
  const location = useLocation();
  const { loading, isAllowed } = useAdminAuth();

  if (loading) {
    return (
      <div className="azuma-auth-shell">
        <div className="azuma-auth-card">
          <h1>{"\u8a8d\u8a3c\u78ba\u8a8d\u4e2d"}</h1>
          <p>{"\u30ed\u30b0\u30a4\u30f3\u72b6\u614b\u3092\u78ba\u8a8d\u3057\u3066\u3044\u307e\u3059\u3002"}</p>
        </div>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedAdminRoute;
