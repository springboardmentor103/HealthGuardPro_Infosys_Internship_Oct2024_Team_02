import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import '../styles/signup.css';

function Signup() {
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'password') {
      setPasswordStrength(checkPasswordStrength(e.target.value));
    }
  };

  const validateForm = () => {
    const { fullName, email, password } = formData;
    if (!fullName.trim()) {
      toast.error('Full name is required');
      return false;
    }
    if (!email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) return '';
    if (password.length < 6) return 'Weak';
    if (password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)) return 'Strong';
    return 'Medium';
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        toast.success('Sign up successful!');
        setTimeout(() => {
          window.location.href = '/login';
        }, 1000);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <ToastContainer position="top-center" />
      <div className="login-box">
        <h1>
          Create your <span>HealthGuard Pro</span> account
        </h1>
        <p>Sign Up to get started</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="fullName" 
            placeholder="Full Name" 
            onChange={handleChange} 
            autoFocus
            onKeyDown={(e) => handleKeyDown(e, emailInputRef)} 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="Email Address" 
            onChange={handleChange}
            ref={emailInputRef}
            onKeyDown={(e) => handleKeyDown(e, passwordInputRef)}
          />
          <div className="password-input-wrapper">
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange}
              ref={passwordInputRef}
            />
            {passwordStrength && (
              <div className={`password-strength ${passwordStrength.toLowerCase()}`}>
                {passwordStrength}
              </div>
            )}
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="signup-text">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
