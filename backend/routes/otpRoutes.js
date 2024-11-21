const express = require('express');
const { sendOtp, verifyOtp, resendOtp } = require('../controllers/otpController');

const router = express.Router();

// Send OTP
router.post('/send-otp', sendOtp);

// Verify OTP
router.post('/verify-otp', verifyOtp);

// Resend OTP
router.post('/resend-otp', resendOtp);

module.exports = router;
