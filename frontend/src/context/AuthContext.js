import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);

        // ✅ Check if token is expired
        const currentTime = Date.now() / 1000; // Convert to seconds
        if (decodedUser.exp && decodedUser.exp < currentTime) {
          console.warn("Token expired, logging out...");
          logout();
          return;
        }

        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
  }, []);

  const login = (token, userData) => {
    try {
      const decodedUser = jwtDecode(token);

      // ✅ Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decodedUser.exp && decodedUser.exp < currentTime) {
        console.warn("Token expired, login rejected.");
        return;
      }

      setUser(userData || decodedUser);
      localStorage.setItem("token", token);
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
