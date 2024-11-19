import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import "../styles/otpverification.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerifyOtp = () => {
    if (!otp) {
      toast.error("Please enter OTP.");
      return;
    }
    if (otp.length === 6 && /^\d{6}$/.test(otp)) {
      setIsLoading(true);
      toast.success(`OTP Verified: ${otp}`);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/reset-password');
      }, 100);
    } else {
      toast.error("Please enter a valid 6-digit OTP.");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "").slice(0, 6);
    setOtp(value);
    if (value.length === 6) {
      // Trigger verification automatically when 6 digits are entered
      setIsLoading(true);
      toast.success(`OTP Verified: ${value}`);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/reset-password');
      }, 1000);
    }
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      toast.info('OTP resent successfully');
      setTimer(30);
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
      <h2 className="otp">Enter OTP</h2>
      <p className="enter">Please enter the 6-digit code</p>
      <input
        type="text"
        className="otp-input"
        placeholder="0 0 0 0 0 0"
        value={otp}
        onChange={handleInputChange}
        maxLength="6"
        autoFocus
      />
      <button className="verify-button" onClick={handleVerifyOtp}>
        Verify
      </button>
      <button className="resend-button" onClick={handleResendOTP} disabled={timer > 0}>
        {timer > 0 ? `Resend OTP in ${timer}s` : 'Resend OTP'}
      </button>
    </div>
  );
};

export default OtpVerification;
