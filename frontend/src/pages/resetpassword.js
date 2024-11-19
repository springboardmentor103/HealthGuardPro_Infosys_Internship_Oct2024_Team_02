import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import "../styles/resetpassword.css";

const ResetPassword = () => {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate(); 

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  const handleResetPassword = () => {
    if (!validatePassword(password)) {
      toast.error("Password must contain at least 6 characters, one uppercase, one lowercase, one number and one special character");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    toast.success("Password reset successful");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      confirmPasswordRef.current?.focus();
    }
  };

  return (
    <div className="container">
      <ToastContainer 
        position="top-center" 
        autoClose={3000} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
      />
      <h1 className="heading">HealthGuard Pro</h1>
      <h2 className="reset-password">Reset Password</h2>
      <p className="enter">Please enter your new password</p>
      <input
        type="password"
        className="password-input"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoFocus
        onKeyDown={handleKeyDown}
      />
      <input
        type="password"
        className="confirm-password-input"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        ref={confirmPasswordRef}
      />
      <button className="reset-button" onClick={handleResetPassword}>
        Reset
      </button>
    </div>
  );
};

export default ResetPassword;
