



// // App.js (Fully Updated)
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext";

// // Layouts
// import UserLayout from "./components/UserLayout";
// import AdminLayout from "./pages/AdminLayout"; // Assuming it's in pages

// // Pages
// import Home from "./pages/Home";
// import AdminDashboard from "./pages/AdminDashboard";
// import AdminLogin from "./pages/AdminLogin";
// import NotFound from "./pages/NotFound";

// /**
//  * A protected route component that checks for admin status.
//  * It's cleaner to handle this logic in a dedicated component.
//  */
// function ProtectedRoute({ children }) {
//   const { isAdmin } = useAuth();
//   if (!isAdmin) {
//     // Redirect them to the /admin/login page, but save the current location they were
//     // trying to go to. This allows us to send them along to that page after they login.
//     return <Navigate to="/admin/login" replace />;
//   }
//   return children;
// }

// /**
//  * The main App component with a clean, layout-based routing structure.
//  */
// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* 1. User Routes - All wrapped in UserLayout */}
//           <Route element={<UserLayout />}>
//             <Route path="/" element={<Home />} />
//             {/* Add other user pages here, e.g., <Route path="/about" element={<About />} /> */}
//           </Route>

//           {/* 2. Authentication Route - No layout */}
//           <Route path="/admin/login" element={<AdminLogin />} />

//           {/* 3. Admin Routes - Protected and wrapped in AdminLayout */}
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <AdminLayout>
//                   <AdminDashboard />
//                 </AdminLayout>
//               </ProtectedRoute>
//             }
//           />

//           {/* 4. Not Found Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;




// App.jsx (Fully Updated with correct import paths)
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Layouts
import UserLayout from "./components/UserLayout.jsx"; // <-- FIXED
import AdminLayout from "./pages/AdminLayout.jsx"; // <-- FIXED

// Pages
import Home from "./pages/Home.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import NotFound from "./pages/NotFound.jsx";

/**
 * A protected route component that checks for admin status.
 */
function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth();
  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

/**
 * The main App component with a clean, layout-based routing structure.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* 1. User Routes - All wrapped in UserLayout */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            {/* Add other user pages here, e.g., <Route path="/about" element={<About />} /> */}
          </Route>

          {/* 2. Authentication Route - No layout */}
          <Route path="/admin/login" element={<AdminLogin />} />

         <Route
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* 4. Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;