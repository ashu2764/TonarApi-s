import bcrypt from "bcrypt";
import { UserSchema } from "@ashu2764/tonar-db-schema";

export class AuthRepository {
  async findByEmail(email) {
    return UserSchema.findOne({ email });
  }

  async createUser(data) {
    data.password = await bcrypt.hash(data.password, 10);
    return UserSchema.create(data);
  }

  async comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
