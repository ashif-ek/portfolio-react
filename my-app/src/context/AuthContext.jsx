// context/AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(() => {
    return sessionStorage.getItem("isAdmin") === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("isAdmin", isAdmin);
  }, [isAdmin]);

  const login = async (username, password) => {
    // Hardcoded check since backend is removed
    if (username === "admin" && password === "291345") {
      setIsAdmin(true);
      return true;
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
