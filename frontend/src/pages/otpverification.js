import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import "../styles/otpverification.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate(); 
  const handleVerifyOtp = () => {
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      toast.success(`OTP Verified: ${otp}`);
      setTimeout(() => {
        navigate('/reset-password');
      }, 1000);
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  };
  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setOtp(value);
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
      <h2 className="otp">Enter OTP</h2>
      <p className="enter">Please enter the 6-digit code</p>
      <input
        type="text"
        className="otp-input"
        placeholder="0 0 0 0 0 0"
        value={otp}
        onChange={handleInputChange}
        maxLength="6"
      />
      <button className="verify-button" onClick={handleVerifyOtp}>
        Verify
      </button>
    </div>
  );
};

export default OtpVerification;
