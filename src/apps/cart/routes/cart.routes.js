import express from "express";
import { cartContainer } from "../cart.container.js";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";

const router = express.Router();
const cartController = cartContainer.resolve("cartController");

router.use(authenticate);

router.get("/cart", (req, res, next) =>
  cartController.get(req, res, next)
);

router.post("/cart/add", (req, res, next) =>
  cartController.add(req, res, next)
);

router.put("/cart/update", (req, res, next) =>
  cartController.update(req, res, next)
);

router.delete("/cart/remove/:productId", (req, res, next) =>
  cartController.remove(req, res, next)
);

export default router;
