import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// Layouts
import UserLayout from "./components/UserLayout.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";

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
    // Navigate unauthenticated users to the login page
    return <Navigate to="/admin/login" replace />;
  }
  // Render the children (which will be the layout/page) if authenticated
  return children;
}

/**
 * The main App component with a clean, layout-based routing structure.
 */
function App() {
  return (
    <AuthProvider>
    <Router 
          //future prop here to opt-in to v7 behavior
          future={{ 
            v7_startTransition: true, 
            v7_relativeSplatPath: true 
          }}
      >
        <Routes>
          {/* 1. User Routes - All wrapped in UserLayout */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            {/* Add other user pages here */}
          </Route>

          {/* 2. Authentication Route - No layout */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* 3. Protected Admin Routes - Wrapped in ProtectedRoute AND AdminLayout */}
          <Route
            path="/admin" // <--- IMPORTANT: The outer route defines the base path
            element={
              // First, wrap the layout in the protection check
              <ProtectedRoute>
                <AdminLayout /> 
              </ProtectedRoute>
            }
          >
             {/* The first child route for the base path /admin 
               Use index for the default dashboard page at the root of the layout. 
             */}
            <Route index element={<AdminDashboard />} /> 
             {/* Add other admin pages here, e.g., <Route path="users" element={<AdminUsers />} /> */}
          </Route>

          {/*Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;















































































// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { AuthProvider, useAuth } from "./context/AuthContext.jsx";

// // Layouts
// import UserLayout from "./components/UserLayout.jsx"; // <-- FIXED
// import AdminLayout from "./pages/AdminLayout.jsx"; // <-- FIXED

// // Pages
// import Home from "./pages/Home.jsx";
// import AdminDashboard from "./pages/AdminDashboard.jsx";
// import AdminLogin from "./pages/AdminLogin.jsx";
// import NotFound from "./pages/NotFound.jsx";

// /**
//  * A protected route component that checks for admin status.
//  */
// function ProtectedRoute({ children }) {
//   const { isAdmin } = useAuth();
//   if (!isAdmin) {
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

//          <Route
//             element={
//               <ProtectedRoute>
//                 <AdminLayout />
//               </ProtectedRoute>
//             }
//           >
//             <Route path="/admin" element={<AdminDashboard />} />
//           </Route>

//           {/* 4. Not Found Route */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;