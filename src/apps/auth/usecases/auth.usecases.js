import jwt from "jsonwebtoken";
import { AuthRepository } from "../repository/auth.repository.js";
import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { randomBytes } from "crypto";


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

    const resetToken = randomBytes(32).toString("hex");
    const expiry = Date.now() + 15 * 60 * 1000;

    await this.authRepository.updateResetToken(
      user._id,
      resetToken,
      expiry
    );

    return {
      message: "Password reset token generated",
      resetToken
    };
  }

  async resetPassword(token, newPassword) {
    const user = await this.authRepository.findByResetToken(token);
    if (!user) throwError("Invalid or expired token", 400);

    await this.authRepository.resetPassword(user._id, newPassword);

    return { message: "Password reset successfully" };
  }
}
