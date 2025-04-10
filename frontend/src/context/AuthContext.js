import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("✅ Decoded User:", decodedUser); // ✅ Debug token decoding
        setUser(decodedUser);
      } catch (error) {
        console.error("❌ Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decodedUser = jwtDecode(token);
      console.log("✅ Login Successful. Decoded User:", decodedUser);
      setUser(decodedUser);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("❌ Error decoding token:", error);
    }
  };

  const logout = () => {
    console.log("🔴 Logging out...");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user,setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
