import React, { useState, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom"; 
import endpoints from "../config/apiConfig"; 
import "../styles/resetpassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const confirmPasswordRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation(); 
  const email = location.state?.email || ""; 

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return regex.test(password);
  };

  useEffect(() => {
    if (!email) {
      navigate("/otp-verification"); // Redirect if no email in state
    }
  }, [email, navigate]);

  const handleResetPassword = async () => {
    if (!validatePassword(password)) {
      toast.error(
        "Password must contain at least 6 characters, one uppercase, one lowercase, one number, and one special character"
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(endpoints.changePassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Password reset successful");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        toast.error(data.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
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
