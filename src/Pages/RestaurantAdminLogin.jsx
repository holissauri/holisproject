import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../restaurant/AdminAuthContext";
import "./RestaurantSite.css";

const JP = {
  title: "\u7ba1\u7406\u30ed\u30b0\u30a4\u30f3",
  subtitle: "\u3042\u305a\u307e\u98df\u5802 \u7ba1\u7406\u753b\u9762",
  introBadge: "Izakaya Admin",
  introTitle: "\u71c8\u308a\u306e\u4e0b\u3067\u3001\u7ba1\u7406\u3092\u30b9\u30e0\u30fc\u30ba\u306b\u3002",
  introText:
    "\u30e1\u30cb\u30e5\u30fc\u3001\u30d0\u30ca\u30fc\u3001\u5e97\u8217\u60c5\u5831\u306e\u66f4\u65b0\u306f\u3053\u3053\u304b\u3089\u3002\u8a31\u53ef\u3055\u308c\u305f\u30b9\u30bf\u30c3\u30d5\u306e\u307f\u30ed\u30b0\u30a4\u30f3\u3067\u304d\u307e\u3059\u3002",
  sceneOne: "\u672c\u65e5\u306e\u66f4\u65b0",
  sceneOneDesc: "\u30d0\u30ca\u30fc\u30fb\u30e1\u30cb\u30e5\u30fc\u3092\u5373\u6642\u53cd\u6620",
  sceneTwo: "\u58f2\u4e0a\u5bfe\u7b56",
  sceneTwoDesc: "\u63a8\u3057\u30e1\u30cb\u30e5\u30fc\u3092\u3059\u3070\u3084\u304f\u5207\u308a\u66ff\u3048",
  sceneThree: "\u5e97\u8217\u60c5\u5831",
  sceneThreeDesc: "\u5ea7\u5e2d\u30fb\u4e88\u7b97\u30fb\u30a2\u30af\u30bb\u30b9\u3092\u4e00\u62ec\u7de8\u96c6",
  email: "\u7ba1\u7406\u8005\u30e1\u30fc\u30eb",
  password: "\u30d1\u30b9\u30ef\u30fc\u30c9",
  showPassword: "\u8868\u793a",
  hidePassword: "\u975e\u8868\u793a",
  submit: "\u30ed\u30b0\u30a4\u30f3",
  backToSite: "\u30b5\u30a4\u30c8\u3078\u623b\u308b",
  help: "\u8a31\u53ef\u3055\u308c\u305f\u30a2\u30ab\u30a6\u30f3\u30c8\u306e\u307f\u7ba1\u7406\u753b\u9762\u3078\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u3059\u3002",
  statusSecure: "\u30bb\u30ad\u30e5\u30a2\u63a5\u7d9a",
  statusRealtime: "\u30ea\u30a2\u30eb\u30bf\u30a4\u30e0\u53cd\u6620",
  statusRole: "\u6a29\u9650\u7ba1\u7406",
  panelTitle: "\u30b9\u30bf\u30c3\u30d5\u8a8d\u8a3c",
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
  const [showPassword, setShowPassword] = useState(false);

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
      <div className="azuma-auth-decor" aria-hidden="true">
        <span className="azuma-lantern azuma-lantern-left" />
        <span className="azuma-lantern azuma-lantern-right" />
        <span className="azuma-smoke azuma-smoke-one" />
        <span className="azuma-smoke azuma-smoke-two" />
      </div>

      <div className="azuma-auth-layout">
        <section className="azuma-auth-story">
          <p className="azuma-auth-badge">{JP.introBadge}</p>
          <h1>{JP.introTitle}</h1>
          <p>{JP.introText}</p>
          <div className="azuma-auth-scenes">
            <div>
              <strong>{JP.sceneOne}</strong>
              <span>{JP.sceneOneDesc}</span>
            </div>
            <div>
              <strong>{JP.sceneTwo}</strong>
              <span>{JP.sceneTwoDesc}</span>
            </div>
            <div>
              <strong>{JP.sceneThree}</strong>
              <span>{JP.sceneThreeDesc}</span>
            </div>
          </div>
        </section>

        <section className="azuma-auth-card">
          <p className="azuma-auth-panel-title">{JP.panelTitle}</p>
          <h2>{JP.title}</h2>
          <p className="azuma-auth-subtitle">{JP.subtitle}</p>

          <div className="azuma-auth-status">
            <span>{JP.statusSecure}</span>
            <span>{JP.statusRealtime}</span>
            <span>{JP.statusRole}</span>
          </div>
          <p className="azuma-auth-help">{JP.help}</p>

          {!isAllowlistConfigured && (
            <p className="azuma-auth-error">{JP.configError}</p>
          )}
          {error && <p className="azuma-auth-error">{error}</p>}

          <form className="azuma-auth-form" onSubmit={handleSubmit}>
            <div className="azuma-auth-field">
              <label htmlFor="admin-email">{JP.email}</label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="azuma-auth-field">
              <label htmlFor="admin-password">{JP.password}</label>
              <div className="azuma-auth-password-wrap">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="azuma-toggle-password"
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? JP.hidePassword : JP.showPassword}
                </button>
              </div>
            </div>

            <button
              className="azuma-auth-submit"
              type="submit"
              disabled={loading || !isAllowlistConfigured}
            >
              {loading ? "\u30ed\u30b0\u30a4\u30f3\u4e2d..." : JP.submit}
            </button>
          </form>

          <Link to="/" className="azuma-auth-back-link">
            {JP.backToSite}
          </Link>
        </section>
      </div>
    </main>
  );
}

export default RestaurantAdminLogin;
