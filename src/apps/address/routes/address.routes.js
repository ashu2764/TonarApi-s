import express from "express";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";
import { AddressController } from "../controller/address.controller.js";

const router = express.Router();
const addressController = new AddressController();

router.use(authenticate);

router.post("/", (req, res, next) =>
  addressController.create(req, res, next)
);

router.get("/", (req, res, next) =>
  addressController.getAll(req, res, next)
);

router.put("/:id", (req, res, next) =>
  addressController.update(req, res, next)
);

router.delete("/:id", (req, res, next) =>
  addressController.delete(req, res, next)
);

export default router;
