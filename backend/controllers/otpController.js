const transporter = require('../config/mailer');
const User = require('../models/User'); // Import User model for email validation

let otpStore = {}; // Temporary storage for OTPs

// Generate a random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP function (used for both initial send and resend)
const sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email is not registered' });
    }

    // Check if an OTP already exists for this email
    const existingOtp = otpStore[email];
    let otp;

    if (existingOtp && Date.now() < existingOtp.expiresAt) {
      // Use existing OTP if it's still valid
      otp = existingOtp.otp;
    } else {
      // Generate a new OTP
      otp = generateOtp();
      otpStore[email] = { otp, expiresAt: Date.now() + 300000 }; // 5 minutes expiry
    }

    // Send OTP via email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Verification',
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

// Verify OTP function
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  const storedOtp = otpStore[email];

  if (!storedOtp) {
    return res.status(400).json({ message: 'No OTP sent to this email' });
  }

  if (Date.now() > storedOtp.expiresAt) {
    delete otpStore[email]; // Delete expired OTP
    return res.status(400).json({ message: 'OTP has expired' });
  }

  if (parseInt(otp, 10) === storedOtp.otp) {
    delete otpStore[email]; // Delete OTP after successful verification
    return res.status(200).json({ message: 'OTP verified successfully' });
  } else {
    return res.status(400).json({ message: 'Invalid OTP' });
  }
};

// Resend OTP function (reuses the sendOtp logic)
const resendOtp = async (req, res) => {
  await sendOtp(req, res);
};

module.exports = { sendOtp, verifyOtp, resendOtp };
