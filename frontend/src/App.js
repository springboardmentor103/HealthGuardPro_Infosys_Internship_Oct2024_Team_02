import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import ForgotPassword from "./pages/forgotpassword";
import OtpVerification from "./pages/otpverification";
import ResetPassword from "./pages/resetpassword";
import Dashboard from "./pages/dashboard";
import Leaderboard from './pages/leaderboard';
import QuizPage from './pages/quiz';
import NutritionQuizPage from './pages/nutritionquiz';
import MentalwellQuizPage from './pages/mentalquiz';
import LifestyleQuizPage from './pages/lifestylequiz';
import BiomarkerQuizPage from './pages/biomarkersquiz';
import './App.css';

function App() {
  return (
    <Router>
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/nutritionquiz" element={<NutritionQuizPage />} />
        <Route path="/mentalquiz" element={<MentalwellQuizPage />} />
        <Route path="/lifequiz" element={<LifestyleQuizPage />} />
        <Route path="/biomarkersquiz" element={<BiomarkerQuizPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
    </Router>
   

  );
}

export default App;
