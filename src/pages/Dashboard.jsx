import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useUserFragrances } from "../hooks/useUserFragrances";
import SearchBar from "../features/search/SearchBar";

// Import the table components
import { FragranceTable } from "../components/FragranceTable";
export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { fragrances, loading } = useUserFragrances(user.uid);

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

      <SearchBar onSearch={handleSearch} loading={false} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FragranceTable title="Testing" data={fragrances.testing} />
          <FragranceTable title="Bookmarked" data={fragrances.bookmarked} />
        </>
      )}
    </div>
  );
}
