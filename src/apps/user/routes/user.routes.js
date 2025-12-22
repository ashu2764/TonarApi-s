import express from "express";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";
import { UserController } from "../controller/user.controller.js";

const router = express.Router();
const userController = new UserController();

router.use(authenticate);

router.get("/profile", (req, res, next) =>
  userController.getProfile(req, res, next)
);

router.put("/profile", (req, res, next) =>
  userController.updateProfile(req, res, next)
);

router.put("/change-password", (req, res, next) =>
  userController.changePassword(req, res, next)
);

router.delete("/delete-account", (req, res, next) =>
  userController.deleteAccount(req, res, next)
);

export default router;
