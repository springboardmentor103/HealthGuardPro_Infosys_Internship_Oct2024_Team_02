import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import endpoints from '../config/apiConfig';
import '../styles/forgotpassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetClick = async () => {
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch(endpoints.sendOtp, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`OTP sent to ${email}`);
        setTimeout(() => {
          navigate('/otp-verification', { state: { email } }); // Pass email via state
        }, 1000);
      } else {
        toast.error(data.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
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
        autoFocus
      />
      <button className="reset-button" id="reset-button" onClick={handleResetClick}>
        Send OTP
      </button>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
