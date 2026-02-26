import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../restaurant/AdminAuthContext";
import "./RestaurantSite.css";

const JP = {
  title: "\u7ba1\u7406\u30ed\u30b0\u30a4\u30f3",
  subtitle: "\u3042\u305a\u307e\u98df\u5802 \u7ba1\u7406\u753b\u9762",
  email: "\u7ba1\u7406\u8005\u30e1\u30fc\u30eb",
  password: "\u30d1\u30b9\u30ef\u30fc\u30c9",
  submit: "\u30ed\u30b0\u30a4\u30f3",
  backToSite: "\u30b5\u30a4\u30c8\u3078\u623b\u308b",
  help: "\u8a31\u53ef\u3055\u308c\u305f\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u307f\u7ba1\u7406\u753b\u9762\u3078\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u3059\u3002",
  configError:
    "\u8a31\u53ef\u30e1\u30fc\u30eb\u8a2d\u5b9a\u304c\u3042\u308a\u307e\u305b\u3093\u3002`VITE_ADMIN_EMAILS`\u3092\u8a2d\u5b9a\u3057\u3066\u304f\u3060\u3055\u3044\u3002",
};

function RestaurantAdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAllowed, login, mapError, isAllowlistConfigured } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAllowed) {
      return;
    }
    const nextPath = location.state?.from?.pathname || "/admin";
    navigate(nextPath, { replace: true });
  }, [isAllowed, location.state, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email: email.trim(), password });
    } catch (submitError) {
      setError(mapError(submitError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="azuma-site azuma-auth-shell">
      <div className="azuma-auth-card">
        <h1>{JP.title}</h1>
        <p className="azuma-auth-subtitle">{JP.subtitle}</p>
        <p className="azuma-auth-help">{JP.help}</p>

        {!isAllowlistConfigured && (
          <p className="azuma-auth-error">{JP.configError}</p>
        )}
        {error && <p className="azuma-auth-error">{error}</p>}

        <form className="azuma-auth-form" onSubmit={handleSubmit}>
          <label htmlFor="admin-email">{JP.email}</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />

          <label htmlFor="admin-password">{JP.password}</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading || !isAllowlistConfigured}>
            {loading ? "\u30ed\u30b0\u30a4\u30f3\u4e2d..." : JP.submit}
          </button>
        </form>

        <Link to="/" className="azuma-auth-back-link">
          {JP.backToSite}
        </Link>
      </div>
    </main>
  );
}

export default RestaurantAdminLogin;
