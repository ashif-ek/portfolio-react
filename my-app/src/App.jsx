import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import LoadingSpinner from "./components/LoadingSpinner.jsx";

// Lazy imports
const UserLayout = lazy(() => import("./components/UserLayout.jsx"));
const AdminLayout = lazy(() => import("./pages/AdminLayout.jsx"));
import Home from "./pages/Home.jsx";
import InstallPrompt from "./components/InstallPrompt.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
const AdminDashboard = lazy(() => import("./pages/AdminDashboard.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const BlogPost = lazy(() => import("./components/BlogPost.jsx"));
const BlogSection = lazy(() => import("./components/BlogSection.jsx"));

function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* User Routes */}
            <Route element={<ErrorBoundary><UserLayout /></ErrorBoundary>}>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<BlogSection />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Route>

            {/* Auth */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <ErrorBoundary><AdminLayout /></ErrorBoundary>
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>

 <ErrorBoundary>
            <InstallPrompt />
            <ScrollToTop/>
          </ErrorBoundary>
                  </Suspense>
      </Router>
    </AuthProvider>
  );
}
