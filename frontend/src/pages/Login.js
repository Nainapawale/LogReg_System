import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./login.css"; // Import CSS for styling

function Login() {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error
    setLoading(true); // Start loading

    try {
      const { data } = await axios.post(
        "http://localhost:5000/login",
        formData
      );
      

      console.log("Login Response:", data); // ✅ Debugging response

      // Store token & user details
      localStorage.setItem("token", data.token);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(
        "❌ Login Error:",
        error.response?.data?.message || error.message
      );
      setError(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="register-link">
          New here?{" "}
          <span onClick={() => navigate("/register")}>Create Account</span>
        </p>
      </div>
    </div>
  );
}

export default Login;
