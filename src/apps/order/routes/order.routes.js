import express from "express";
import { orderContainer } from "../order.container.js";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";

const router = express.Router();
const orderController = orderContainer.resolve("orderController");

router.use(authenticate);

router.post("/order", (req, res, next) =>
  orderController.create(req, res, next)
);

router.get("/orders", (req, res, next) =>
  orderController.getAll(req, res, next)
);

router.get("/order/:id", (req, res, next) =>
  orderController.getById(req, res, next)
);

router.put("/order/cancel/:id", (req, res, next) =>
  orderController.cancel(req, res, next)
);

export default router;
