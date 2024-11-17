import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../styles/forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetClick = () => {
    if (email) {
      toast.success(`OTP sent to ${email}`);
      setTimeout(() => {
        navigate('/otp-verification');
      }, 1000); 
    } else {
      toast.error('Please enter a valid email address');
    }
  };

  return (
    <div className="container">
      <h1 className="heading">HealthGuard Pro</h1>
      <h2 className="forgot-password">Forgot Password</h2>
      <p className="enter">Enter your registered email address</p>
      <input
        type="email"
        className="email-input"
        id="email-input"
        placeholder="Email Address"
        value={email}
        onChange={handleInputChange}
      />
      <button className="reset-button" id="reset-button" onClick={handleResetClick}>
        Send OTP
      </button>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
