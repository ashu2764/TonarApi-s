import jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth.repository.js";
import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { randomInt } from "crypto";
import { sendEmail } from "../../../infrastructure/email/email.service.js";
import {resetPasswordOtpTemplate} from "../../../infrastructure/email/templates/reset-password-otp.js";


export class AuthUsecase {
  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(payload) {
    const existing = await this.authRepository.findByEmail(payload.email);
    if (existing) {
      throwError("User already exists", 400);
    }

    return await this.authRepository.createUser(payload);
  }

  async login(email, password) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) {
      throwError("Invalid credentials", 401);
    }

    const match = await this.authRepository.comparePassword(password, user.password);
    if (!match) {
      throwError("Invalid credentials", 401);
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return { token, user };
  }

async forgotPassword(email) {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throwError("User not found", 404);

    const otp = randomInt(100000, 999999).toString();
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes

    await this.authRepository.saveOtp(user._id, otp, expiry);

    await sendEmail({
      to: user.email,
      subject: "Tonar - Password Reset OTP",
      html: resetPasswordOtpTemplate(otp)
    });

    return { message: "OTP sent to registered email" };
  }

   async resetPassword(otp, newPassword) {
    const user = await this.authRepository.findByOtp(otp);
    if (!user) throwError("Invalid or expired OTP", 400);

    await this.authRepository.resetPassword(user._id, newPassword);

    return { message: "Password reset successfully" };
  }
}
