// import Header from "./components/Header";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Contact from "./components/Contacts";
// import Footer from "./components/Footer";
// import Certificates from "./components/certificate";

// function App() {
//   return (
//     <div className="bg-white text-gray-800 min-h-screen">
//       <Header />
//       <main>
//         <Hero />
//         <About />
//         <Skills />
//         <Projects />
//         <Certificates />
//         <Contact />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;




// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Import your pages and components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";
import Api from "./components/Api";

function App() {
  // 1. Check session storage for existing login state
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("isAdmin") === "true";
  });

  // 2. Persist login state changes to session storage
  useEffect(() => {
    sessionStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  // 3. Centralized login handler that fetches from the JSON server
  const handleLogin = async (username, password) => {
    try {
      const res = await Api.get("/admin");
      if (res.data.username === username && res.data.password === password) {
        setIsAdmin(true);
        return true; // Indicate success
      }
    } catch (error) {
      console.error("Login request failed:", error);
    }
    return false; // Indicate failure
  };

  const handleLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("isAdmin");
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Conditionally render Header and Footer to hide them on the login page */}
        <Routes>
          <Route path="/admin/login" element={null} />
          <Route path="*" element={<Header />} />
        </Routes>

        <main className="flex-grow">
          <Routes>
            {/* Public route */}
            <Route path="/" element={<Home />} />

            {/* Admin login route */}
            <Route
              path="/admin/login"
              element={
                isAdmin ? <Navigate to="/admin" /> : <AdminLogin handleLogin={handleLogin} />
              }
            />

            {/* Protected Admin Dashboard */}
            <Route
              path="/admin"
              element={
                isAdmin ? <AdminDashboard handleLogout={handleLogout} /> : <Navigate to="/admin/login" />
              }
            />
            
            {/* 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <Routes>
          <Route path="/admin/login" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;