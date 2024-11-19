import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "../styles/otpverification.css";

const OtpVerification = () => {
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      setShowError(true);
      toast.error("Please enter a complete OTP.");
      setTimeout(() => setShowError(false), 820); // Match animation duration
      return;
    }
    if (/^\d{6}$/.test(otp)) {
      setIsLoading(true);
      toast.success(`OTP Verified: ${otp}`);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/reset-password");
      }, 100);
    } else {
      setShowError(true);
      toast.error("Please enter a valid 6-digit OTP.");
      setTimeout(() => setShowError(false), 820); // Match animation duration
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      handleVerifyOtp();
    } else if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = value;
      setOtpArray(newOtpArray);
      setOtp(newOtpArray.join(""));

      // Auto focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      // Auto verify when all digits are entered
      if (newOtpArray.every((digit) => digit) && index === 5) {
        handleVerifyOtp();
      }
    }
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      toast.info("OTP resent successfully");
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
      <div className="otp-input-group">
        {otpArray.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            className={`otp-input-box ${digit ? "filled" : ""} ${
              showError ? "error" : ""
            }`}
            value={digit}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            maxLength="1"
            autoFocus={index === 0}
          />
        ))}
      </div>
      <button
        className="verify-button"
        onClick={handleVerifyOtp}
        disabled={isLoading || otp.length !== 6}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </button>
      <button
        className="resend-button"
        onClick={handleResendOTP}
        disabled={timer > 0}
      >
        {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
      </button>
    </div>
  );
};

export default OtpVerification;
