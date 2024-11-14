import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Welcome to <span>HealthGuard Pro</span></h1>
        <p>Log In to get started</p>
        <form>
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Log In</button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
