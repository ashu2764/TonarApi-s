import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { AuthUsecase } from "../usecases/auth.usecases.js";

export class AuthController {
  constructor() {
    this.authUsecase = new AuthUsecase();
  }

  async register(req, res, next) {
    try {
      const result = await this.authUsecase.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throwError("Email and password required", 400);
      }

      const { token, user } = await this.authUsecase.login(email, password);

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
      });

      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      next(error);
    }
  }
}
