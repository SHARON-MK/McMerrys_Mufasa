const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async (toEmail, subject, htmlContent) => {
  // Create a transporter using Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,        // e.g., yourcompany@gmail.com
      pass: process.env.MAIL_PASS         // Gmail App Password
    }
  });

  const mailOptions = {
    from: `"Mc Merrys 🍰" <${process.env.MAIL_USER}>`,
    to: toEmail,
    subject: subject,
    html: htmlContent
  };

  // Send the email
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to ${toEmail}`);
    return result;
  } catch (error) {
    console.error(`❌ Failed to send email to ${toEmail}:`, error);
    throw error;
  }
};

module.exports = sendEmail;
