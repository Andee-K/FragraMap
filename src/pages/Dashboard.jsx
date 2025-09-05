import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FragranceSearch from './FragranceSearch';

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    // Navigate to FragranceSearch page with the query
    navigate(`/fragrance-search?q=${encodeURIComponent(query)}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.displayName}!</p>
      <p>This is your FragraMap dashboard.</p>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
      <FragranceSearch></FragranceSearch>
    </div>
  );
}

export default Dashboard;