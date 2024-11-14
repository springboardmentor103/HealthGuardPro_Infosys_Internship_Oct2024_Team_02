import React from "react";
import "../styles/signup.css";

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
          <a href="/forgot-password">Forgot Password?</a>
        </p>
        <p className="signup-text">
          Already have an account? <a href="/login">Log In</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
