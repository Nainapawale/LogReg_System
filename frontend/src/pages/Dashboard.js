import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css"; // Import CSS for styling

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user from storage
    localStorage.removeItem("token"); // Remove token for security
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h2>Welcome, {user ? user.name : "User"}!</h2>
        <p>Email: {user ? user.email : "Not Available"}</p>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
