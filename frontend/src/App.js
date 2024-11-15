import React from "react";
import "./App.css";
import Login from "./pages/login.js";
import OtpVerification from "./pages/otpverification";
import ForgotPassword from "./pages/forgotpassword";
import ResetPassword from "./pages/resetpassword";

function App() {
  return (
    <div className="App">
      <Login />
      <OtpVerification />
      <ForgotPassword />
      <ResetPassword />
    </div>
  );
}

export default App;
