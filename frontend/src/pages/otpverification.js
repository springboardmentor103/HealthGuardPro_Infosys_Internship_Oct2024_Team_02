import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useLocation } from "react-router-dom";
import endpoints from "../config/apiConfig";
import "../styles/otpverification.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const OtpVerification = () => {
  const [otpArray, setOtpArray] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";


   useEffect(() => {
     if (!email) {
       navigate("/forgot-password"); // Redirect if no email in state
     }
   }, [email, navigate]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleInputChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 1) {
      const newOtpArray = [...otpArray];
      newOtpArray[index] = value;
      setOtpArray(newOtpArray);
      setOtp(newOtpArray.join(""));

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      setShowError(true);
      toast.error("Please enter a complete OTP.");
      setTimeout(() => setShowError(false), 820);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(endpoints.verifyOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("OTP Verified!");
        setTimeout(() => {
          navigate("/reset-password", { state: { email } });
        }, 1000);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (timer === 0) {
      try {
        const response = await fetch(endpoints.resendOtp, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.info("OTP resent successfully");
          setTimer(30);
        } else {
          toast.error(data.message || "Failed to resend OTP");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="otp-card">
      <div className="otp-container">
        <ToastContainer position="top-center" autoClose={3000} />
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

      {/* Loader Popup */}
      {isLoading && (
        <div className="loader-overlay">
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "20vh" }}>
            <CircularProgress color="success" />
            <p style={{ marginTop: "20px" }}>Loading... Please wait</p>
          </Box>
        </div>
      )}
    </div>
  );
};

export default OtpVerification;
