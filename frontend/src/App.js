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
  );
}

export default App;
