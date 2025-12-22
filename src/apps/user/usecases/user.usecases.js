import bcrypt from "bcrypt";
import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { UserRepository } from "../repository/user.repositroy.js";

export class UserUsecase {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throwError("User not found", 404);
    return user;
  }

  async updateProfile(userId, payload) {
    const user = await this.userRepository.updateById(userId, payload);
    if (!user) throwError("User not found", 404);
    return user;
  }

  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.userRepository.findByIdWithPassword(userId);
    if (!user) throwError("User not found", 404);

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) throwError("Old password is incorrect", 400);

    await this.userRepository.updatePassword(userId, newPassword);
    return { message: "Password changed successfully" };
  }

  async deleteAccount(userId) {
    await this.userRepository.deleteById(userId);
    return { message: "Account deleted successfully" };
  }
}
