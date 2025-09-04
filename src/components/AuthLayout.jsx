import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function AuthLayout({ 
  title, 
  subtitle, 
  linkText, 
  linkPath, 
  onSubmit, 
  buttonText,
  showNameField = false
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (showNameField) {
        await onSubmit(name, email, password);
      } else {
        await onSubmit(email, password);
      }
    } catch (error) {
      setError(error.message);
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-header">
          <h1>{title}</h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </div>
        
        <div className="auth-form-container">
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {showNameField && (
              <>
                <label htmlFor="name">Full Name:</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </>
            )}
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">
              {buttonText}
            </button>
          </form>
        </div>
        
        <div className="auth-footer">
          <p>
            {linkText} <Link to={linkPath} className="auth-link">{title.includes('Register') ? 'Login here' : 'Register here'}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
