import bcrypt from "bcrypt";
import { UserSchema } from "@ashu2764/tonar-db-schema";

export class AuthRepository {
  async findByEmail(email) {
    return UserSchema.findOne({ email });
  }

    async saveOtp(userId, otp, expiry) {
    return UserSchema.findByIdAndUpdate(userId, {
      resetPasswordOtp: otp,
      resetPasswordExpires: expiry
    });
  }


    async findByOtp(otp) {
    return UserSchema.findOne({
      resetPasswordOtp: otp,
      resetPasswordExpires: { $gt: Date.now() }
    });
  }

    async resetPassword(userId, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);

    return UserSchema.findByIdAndUpdate(userId, {
      password: hashed,
      resetPasswordOtp: null,
      resetPasswordExpires: null
    });
  }


  async createUser(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return UserSchema.create(data);
  }


  async resetPassword(userId, newPassword) {
    const hashed = await bcrypt.hash(newPassword, 10);
    return UserSchema.findByIdAndUpdate(userId, {
      password: hashed,
      resetPasswordOtp: null,
      resetPasswordExpires: null
    });
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
