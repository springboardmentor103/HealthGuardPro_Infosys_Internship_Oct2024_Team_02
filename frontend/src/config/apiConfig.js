const API_BASE_URL = "http://localhost:8080/api"; 

const endpoints = {
  register: `${API_BASE_URL}/auth/register`,          
  login: `${API_BASE_URL}/auth/login`,                 
  sendOtp: `${API_BASE_URL}/otp/send-otp`,           
  verifyOtp: `${API_BASE_URL}/otp/verify-otp`,       
  resendOtp: `${API_BASE_URL}/otp/resend-otp`,       
  changePassword: `${API_BASE_URL}/auth/change-password`, 
  fetchDashboard: (userId) => `${API_BASE_URL}/dashboard/${userId}`,
  updateScores: `${API_BASE_URL}/dashboard/update-scores`,
  uploadImage: `${API_BASE_URL}/dashboard/upload-image`,
  leaderboard: (metric) => `${API_BASE_URL}/leaderboard?metric=${metric}`,
};

export default endpoints;
