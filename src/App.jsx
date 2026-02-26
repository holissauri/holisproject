import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import "./index.css";
import { AdminAuthProvider } from "./restaurant/AdminAuthContext";
import ProtectedAdminRoute from "./restaurant/ProtectedAdminRoute";

const RestaurantHome = lazy(() => import("./Pages/RestaurantHome"));
const RestaurantAdmin = lazy(() => import("./Pages/RestaurantAdmin"));
const RestaurantAdminLogin = lazy(() => import("./Pages/RestaurantAdminLogin"));
const Home = lazy(() => import("./Pages/Home"));
const About = lazy(() => import("./Pages/About"));
const AnimatedBackground = lazy(() => import("./components/Background"));
const Navbar = lazy(() => import("./components/Navbar"));
const Portofolio = lazy(() => import("./Pages/Portofolio"));
const ContactPage = lazy(() => import("./Pages/Contact"));
const ProjectDetails = lazy(() => import("./components/ProjectDetail"));
const WelcomeScreen = lazy(() => import("./Pages/WelcomeScreen"));

const CURRENT_YEAR = new Date().getFullYear();
const PROFILE_NAME = "Holis Sindy Sauri";
const PROFILE_LINK = "https://github.com/holissauri";

const PageFallback = () => (
  <div className="min-h-[30vh] flex items-center justify-center text-slate-300">
    Loading...
  </div>
);

const Footer = () => (
  <footer>
    <center>
      <hr className="my-3 border-gray-400 opacity-15 sm:mx-auto lg:my-6 text-center" />
      <span className="block text-sm pb-4 text-gray-500 text-center dark:text-gray-400">
        &copy; {CURRENT_YEAR}{" "}
        <a
          href={PROFILE_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {PROFILE_NAME}
        </a>
        . All Rights Reserved.
      </span>
    </center>
  </footer>
);

const LandingPage = ({ showWelcome, setShowWelcome }) => {
  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && (
          <Suspense fallback={<PageFallback />}>
            <WelcomeScreen onLoadingComplete={() => setShowWelcome(false)} />
          </Suspense>
        )}
      </AnimatePresence>

      {!showWelcome && (
        <Suspense fallback={<PageFallback />}>
          <>
            <Navbar />
            <AnimatedBackground />
            <Home />
            <About />
            <Portofolio />
            <ContactPage />
            <Footer />
          </>
        </Suspense>
      )}
    </>
  );
};

const ProjectPageLayout = () => (
  <Suspense fallback={<PageFallback />}>
    <>
      <ProjectDetails />
      <Footer />
    </>
  </Suspense>
);

function App() {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<PageFallback />}>
                <RestaurantHome />
              </Suspense>
            }
          />
          <Route
            path="/admin-login"
            element={
              <Suspense fallback={<PageFallback />}>
                <RestaurantAdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <Suspense fallback={<PageFallback />}>
                  <RestaurantAdmin />
                </Suspense>
              </ProtectedAdminRoute>
            }
          />
          <Route
            path="/portfolio"
            element={
              <LandingPage
                showWelcome={showWelcome}
                setShowWelcome={setShowWelcome}
              />
            }
          />
          <Route path="/project/:id" element={<ProjectPageLayout />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;
