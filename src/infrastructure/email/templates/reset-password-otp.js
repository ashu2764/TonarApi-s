export const resetPasswordOtpTemplate = (otp) => `
  <div style="font-family: Arial, sans-serif">
    <h2>Password Reset Request</h2>
    <p>Your OTP for resetting your password is:</p>
    <h1 style="letter-spacing: 3px">${otp}</h1>
    <p>This OTP is valid for 10 minutes.</p>
    <p>If you did not request this, please ignore this email.</p>
  </div>
`;
