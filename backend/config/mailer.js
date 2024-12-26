const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail', // Use Gmail service
  auth: {
    user: process.env.EMAIL_USER, // Gmail email address
    pass: process.env.EMAIL_PASS, // App password
  },
});

module.exports = transporter;
