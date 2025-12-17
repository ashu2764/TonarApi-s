import jwt from "jsonwebtoken";
import throwError from "../error-handling/throw-error.js";
import { UserSchema } from "@ashu2764/tonar-db-schema";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) throwError("Authentication required", 401);

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throwError("Invalid or expired token", 401);
    }

    const user = await UserSchema.findById(decoded.id);
    if (!user) {
      throwError("User not found", 401);
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch (error) {
    next(error);
  }
};
