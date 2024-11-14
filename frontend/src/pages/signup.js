import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>
          Create your <span>HealthGuard Pro</span> account
        </h1>
        <p>Sign Up to get started</p>
        <form>
          <input type="text" placeholder="Full Name" />
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
        <p className="forgot-password">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <p className="signup-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
