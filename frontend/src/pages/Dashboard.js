import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
// import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Design.css"; // Import CSS

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {user ? user.name : "User"}!</h2>
        <p>Email: {user ? user.email : "Not Available"}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
