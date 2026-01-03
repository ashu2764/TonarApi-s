import express from "express";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";
import { adminOnly } from "../../../infrastructure/middlewares/role-middleware.js";
import { ProductController } from "../controller/product.controller.js";
import { upload } from "../../../infrastructure/middlewares/multer.middleware.js";      

const router = express.Router();
const productController = new ProductController();

router.get("/", (req, res, next) =>
  productController.getAll(req, res, next)
);

router.get("/:id", (req, res, next) =>
  productController.getById(req, res, next)
);

router.post(
  "/",
  authenticate,
  adminOnly,
  upload.array("images", 5),
  (req, res, next) => productController.create(req, res, next)
);

router.put(
  "/:id",
  authenticate,
  adminOnly,
  upload.array("images", 5),//optional
  (req, res, next) => productController.update(req, res, next)
);

router.delete(
  "/:id",
  authenticate,
  adminOnly,
  (req, res, next) => productController.delete(req, res, next)
);

export default router;
