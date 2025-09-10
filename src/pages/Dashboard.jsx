import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SearchBar from "../features/search/SearchBar";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (query.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.displayName}!</p>
      <p>This is your FragraMap dashboard.</p>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>

      {/* Use SearchBar here */}
      <SearchBar onSearch={handleSearch} loading={false} />
    </div>
  );
}

export default Dashboard;
