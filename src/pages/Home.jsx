import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to FragraMap</h1>
      <p>Your fragrance mapping application</p>
      <div className="auth-links">
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </div>
  );
}

export default Home;
