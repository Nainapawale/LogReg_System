import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">MyApp</div>
      <ul className="nav-links">
        <li>
          <Link to="/dashboard">Home </Link>
          <Link to="/register">Register </Link>
          <Link to="/login">Login </Link>
        </li>

        {user && (
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>

      <div className="nav-auth">
        {user ? (
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}
        {/* {user ? <p>Welcome, {user.name}</p> : <p>Please login</p>} */}
      </div>
    </nav>
  );
};

export default Navbar;
