import express from "express";
import { categoryContainer } from "../category.container.js";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";
import { adminOnly } from "../../../infrastructure/middlewares/role-middleware.js";

const router = express.Router();
const categoryController = categoryContainer.resolve("categoryController");

router.post(
  "/category",
  authenticate,
  adminOnly,
  (req, res, next) => categoryController.create(req, res, next)
);

router.get("/categories", (req, res, next) =>
  categoryController.getAll(req, res, next)
);

router.put(
  "/category/:id",
  authenticate,
  adminOnly,
  (req, res, next) => categoryController.update(req, res, next)
);

router.delete(
  "/category/:id",
  authenticate,
  adminOnly,
  (req, res, next) => categoryController.delete(req, res, next)
);

export default router;
