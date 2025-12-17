import express from "express";
import { authContainer } from "../auth.container.js";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";

const authController = authContainer.resolve("authController");

const authRouter = express.Router();

authRouter.post("/register", (req, res, next) => {
  authController.register(req, res, next);
});

authRouter.post("/login", (req, res, next) => {
  authController.login(req, res, next);
});

authRouter.post("/logout", authenticate, (req, res, next) => {
  authController.logout(req, res, next);
});

export default authRouter;
