import express from "express";
import { wishlistContainer } from "../wishlist.container.js";
import { authenticate } from "../../../infrastructure/middlewares/auth-middleware.js";

const router = express.Router();
const wishlistController = wishlistContainer.resolve("wishlistController");

router.use(authenticate);

router.get("/wishlist", (req, res, next) =>
  wishlistController.get(req, res, next)
);

router.post("/wishlist/add", (req, res, next) =>
  wishlistController.add(req, res, next)
);

router.delete("/wishlist/remove/:productId", (req, res, next) =>
  wishlistController.remove(req, res, next)
);

export default router;
