import bcrypt from "bcrypt";
import { UserSchema } from "@ashu2764/tonar-db-schema";

export class UserRepository {
  async findById(userId) {
    return UserSchema.findById(userId).select("-password");
  }

  async findByIdWithPassword(userId) {
    return UserSchema.findById(userId);
  }

  async updateById(userId, payload) {
    return UserSchema.findByIdAndUpdate(userId, payload, {
      new: true,
      runValidators: true
    }).select("-password");
  }

  async updatePassword(userId, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);
    return UserSchema.findByIdAndUpdate(userId, { password: hashed });
  }

  async deleteById(userId) {
    return UserSchema.findByIdAndDelete(userId);
  }
}
