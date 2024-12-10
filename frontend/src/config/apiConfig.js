// src/config/apiConfig.js

// Base URL for your backend
const API_BASE_URL = "http://localhost:8080/api"; 

// Endpoints
const endpoints = {
  register: `${API_BASE_URL}/auth/register`,          
  login: `${API_BASE_URL}/auth/login`,                 
  sendOtp: `${API_BASE_URL}/otp/send-otp`,           
  verifyOtp: `${API_BASE_URL}/otp/verify-otp`,       
  resendOtp: `${API_BASE_URL}/otp/resend-otp`,       
  changePassword: `${API_BASE_URL}/auth/change-password`, 
  // Dashboard
  fetchDashboard: (userId) => `${API_BASE_URL}/dashboard/${userId}`,
  updateScores: `${API_BASE_URL}/dashboard/update-scores`,
  uploadImage: `${API_BASE_URL}/dashboard/upload-image`,

  // Other features
  leaderboard: `${API_BASE_URL}/leaderboard`, // Example endpoint for leaderboard
};

export default endpoints;
