import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { UserUsecase } from "../usecases/user.usecases.js";

export class UserController {
  constructor() {
    this.userUsecase = new UserUsecase();
  }

  async getProfile(req, res, next) {
    try {
      const result = await this.userUsecase.getProfile(req.user.id);
      res.status(200).json({data:result, message: "User profile retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req, res, next) {
    try {
      const result = await this.userUsecase.updateProfile(req.user.id, req.body);
      res.status(200).json({data:result, message: "User profile updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        throwError("Old and new password required", 400);
      }

      const result = await this.userUsecase.changePassword(
        req.user.id,
        oldPassword,
        newPassword
      );
      res.status(200).json({data:result, message: "Password changed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async deleteAccount(req, res, next) {
    try {
      const result = await this.userUsecase.deleteAccount(req.user.id);

      res.clearCookie("token", {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production"
      });

      res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
