import { WishlistUsecase } from "../usecases/wishlist.usecases.js";

export class WishlistController {
  constructor() {
    this.wishlistUsecase = new WishlistUsecase();
  }

  async get(req, res, next) {
    try {
      const result = await this.wishlistUsecase.getWishlist(req.user.id);
      res.status(200).json({data:result, message: "Wishlist retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      const { productId } = req.body;
      const result = await this.wishlistUsecase.addToWishlist(
        req.user.id,
        productId
      );
      res.status(200).json({data:result, message: "Product added to wishlist successfully" });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const result = await this.wishlistUsecase.removeFromWishlist(
        req.user.id,
        req.params.productId
      );
      res.status(200).json({data:result, message: "Product removed from wishlist successfully" });
    } catch (error) {
      next(error);
    }
  }
}
