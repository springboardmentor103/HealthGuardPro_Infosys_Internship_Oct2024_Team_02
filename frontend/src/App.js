import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import ForgotPassword from "./pages/forgotpassword";
import OtpVerification from "./pages/otpverification";
import ResetPassword from "./pages/resetpassword";
import Dashboard from "./pages/dashboard";
import Leaderboard from "./pages/leaderboard";
import QuizPage from "./pages/quiz";
import NutritionQuizPage from "./pages/nutritionquiz";
import MentalwellQuizPage from "./pages/mentalquiz";
import LifestyleQuizPage from "./pages/lifestylequiz";
import BiomarkerQuizPage from "./pages/biomarkersquiz";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutritionquiz"
            element={
              <ProtectedRoute>
                <NutritionQuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentalquiz"
            element={
              <ProtectedRoute>
                <MentalwellQuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lifequiz"
            element={
              <ProtectedRoute>
                <LifestyleQuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/biomarkersquiz"
            element={
              <ProtectedRoute>
                <BiomarkerQuizPage />
              </ProtectedRoute>
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
