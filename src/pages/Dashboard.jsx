import React from 'react';
import { useAuth } from '../context/AuthContext';
import SearchContainer from '../features/search/SearchContainer';

function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <p>Welcome, {user?.displayName}!</p>
      <p>This is your FragraMap dashboard.</p>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
      <SearchContainer />
    </div>
  );
}

export default Dashboard;