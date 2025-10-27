
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// // Layouts
// import UserLayout from "./components/UserLayout.jsx";
// import AdminLayout from "./pages/AdminLayout.jsx";

// // Pages
// import Home from "./pages/Home.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import NotFound from "./pages/NotFound.jsx";
// import BlogPost from "./components/BlogPost.jsx";
// import BlogSection from "./components/BlogSection.jsx";
// import ErrorBoundary from "./components/ErrorBoundary.jsx"; // This is already imported 👍

// /**
//  * A protected route component that checks for admin status.
//  */
// function ProtectedRoute({ children }) {
//   const { isAdmin } = useAuth();
//   if (!isAdmin) {
//     // Navigate unauthenticated users to the login page
//     return <Navigate to="/admin/login" replace />;
//   }
//   // Render the children (which will be the layout/page) if authenticated
//   return children;
// }

// /**
//  * The main App component with a clean, layout-based routing structure.
//  */
// function App() {
//   return (
//     <AuthProvider>
//       <Router
//         //future prop here to opt-in to v7 behavior
//         future={{
//           v7_startTransition: true,
//           v7_relativeSplatPath: true,
//         }}
//       >
//         <Routes>
//           {/* 1. User Routes - Wrap the entire layout in an ErrorBoundary */}
//           <Route
//             element={
//               <ErrorBoundary>
//                 <UserLayout />
//               </ErrorBoundary>
//             }
//           >
//             <Route path="/" element={<Home />} />
//             {/* The full list of all blog posts */}
//             <Route path="/blog" element={<BlogSection />} />
//             {/* The single, full blog post page */}
//             <Route path="/blog/:slug" element={<BlogPost />} />
//           </Route>

//           {/* 2. Authentication Route - No layout */}
//           <Route path="/admin/login" element={<AdminLogin />} />

//           {/* 3. Protected Admin Routes - Wrapped in ProtectedRoute AND ErrorBoundary */}
//           <Route
//             path="/admin" // <--- IMPORTANT: The outer route defines the base path
//             element={
//               // First, wrap the layout in the protection check
//               <ProtectedRoute>
//                 {/* Then, wrap the layout in an ErrorBoundary */}
//                 <ErrorBoundary>
//                   <AdminLayout />
//                 </ErrorBoundary>
//               </ProtectedRoute>
//             }
//           >
//             {/* The first child route for the base path /admin 
//                Use index for the default dashboard page at the root of the layout. 
//             */}
//             <Route index element={<AdminDashboard />} />
//             {/* Add other admin pages here, e.g., <Route path="users" element={<AdminUsers />} /> */}
//           </Route>

//           {/*Not Found Route */}
//           {/* You could also wrap NotFound in an ErrorBoundary if it can fail */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;












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
