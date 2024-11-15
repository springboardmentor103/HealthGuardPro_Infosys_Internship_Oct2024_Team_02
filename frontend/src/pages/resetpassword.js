import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../resetpassword.css";

const ResetPassword = () => {
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleResetPassword = () => {
    if (password.length >= 6 && password === confirmPassword) {
      toast.success("Password reset successful.");
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
    } else {
      toast.warning("Please enter a valid password.");
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
      />
      <input
        type="password"
        className="confirm-password-input"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="reset-button" onClick={handleResetPassword}>
        Reset
      </button>
    </div>
  );
};

export default ResetPassword;
