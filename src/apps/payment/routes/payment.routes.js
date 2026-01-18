import express from "express";
import { paymentContainer } from "../payment.cotainer.js";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";

const router = express.Router();
const paymentController = paymentContainer.resolve("paymentController");



// router.use(authenticate);

router.post("/payment/create", authenticate, (req, res, next) =>
  paymentController.create(req, res, next)
);

router.post("/payment/verify", (req, res, next) =>
  paymentController.verify(req, res, next)
);

router.get("/payment/status/:orderId", authenticate, (req, res, next) =>
  paymentController.status(req, res, next)
);

export default router;
