import React, { useRef, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import endpoints from "../config/apiConfig";
import AuthContext from "../context/AuthContext";
import "../styles/login.css";

function LoginPage() {
  const { login } = useContext(AuthContext); // Access the login function from AuthContext
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(endpoints.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        login(data.token, data._id, data.name); // Save token and set authenticated state via AuthContext
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
<div className="login-card">
  <div className="login-container">
    <div className="login-box">
      <h1>Welcome to <span>HealthGuard Pro</span></h1>
      <p>Log In to get started</p>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Email Address" 
          autoFocus 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleEmailKeyDown} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          ref={passwordInputRef}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handlePasswordKeyDown} 
        />
        <p className="forgotpassword">
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p className="signup-text">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
    <div className="login-toast-wrapper">
        <ToastContainer autoClose={3000} />
      </div>

  </div>
</div>

  );
}

export default LoginPage;