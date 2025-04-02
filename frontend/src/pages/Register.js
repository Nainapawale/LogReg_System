import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css"; // Import CSS for styling

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    setLoading(true); // Start loading

    console.log("📤 Sending data:", formData);

    try {
      await axios.post("http://localhost:5000/register", formData);
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(
        " Registration Error:",
        error.response?.data?.message || error.message
      );
      setError(
        error.response?.data?.message || "Registration failed. Try again."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {error && <p className="error-msg">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
