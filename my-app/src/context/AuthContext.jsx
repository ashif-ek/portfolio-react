// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import Api from "../components/Api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("isAdmin") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  const login = async (username, password) => {
    try {
      // Secure login via POST request to backend
      const res = await Api.post("/login", { username, password });
      
      if (res.data.success) {
        setIsAdmin(true);
        // Optionally store token here if implementing real sessions: 
        // sessionStorage.setItem('token', res.data.token);
        return true;
      }
    } catch (err) {
      console.error("Login verification failed:", err);
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem("isAdmin");
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy use
export const useAuth = () => useContext(AuthContext);
