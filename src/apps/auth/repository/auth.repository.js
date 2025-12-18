import bcrypt from "bcrypt";
import { UserSchema } from "@ashu2764/tonar-db-schema";

export class AuthRepository {
  async findByEmail(email) {
    return UserSchema.findOne({ email });
  }

  async findByResetToken(token) {
    return UserSchema.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });
  }

  async createUser(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return UserSchema.create(data);
  }

   async updateResetToken(userId, token, expiry) {
    return UserSchema.findByIdAndUpdate(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expiry
    });
  }

  async resetPassword(userId, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);
    return UserSchema.findByIdAndUpdate(userId, {
      password: hashed,
      resetPasswordToken: null,
      resetPasswordExpires: null
    });
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
