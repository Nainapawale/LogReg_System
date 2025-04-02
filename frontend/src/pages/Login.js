import React, { useState, useContext } from "react";
import { loginUser } from "../api/auth.js";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Design.css"; // Import CSS

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser(form); // Call API
      console.log("Login Response:", response.data);
      const { user, token } = response.data;

      localStorage.setItem("token", token); // ✅ Save token in localStorage
      setUser(user); // ✅ Update context

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <p className="register-link">
          New here?{" "}
          <span onClick={() => navigate("/register")}>Create an account</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
