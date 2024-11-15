<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
=======
import React from "react";
import "./App.css";
import Login from "./pages/login.js";
import Signup from "./pages/signup.js";
import OtpVerification from "./pages/otpverification";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";

function App() {
  return (
    <div className="App">
      <Login />
      <Signup />
      <OtpVerification />
      <ForgotPassword />
      <ResetPassword />
    </div>
>>>>>>> develop
  );
}

export default App;
