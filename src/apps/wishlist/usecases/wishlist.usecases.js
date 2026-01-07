import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { WishlistRepository } from "../repository/wishlist.repository.js";
import { ProductRepository } from "../../products/repository/product.repository.js";

export class WishlistUsecase {
  constructor() {
    this.wishlistRepository = new WishlistRepository();
    this.productRepository = new ProductRepository();
  }

  async getWishlist(userId) {
    let wishlist = await this.wishlistRepository.findByUser(userId);
    if (!wishlist) {
      wishlist = await this.wishlistRepository.create(userId);
    }
    return wishlist;
  }

  async addToWishlist(userId, productId) {
    const product = await this.productRepository.findById(productId);
    if (!product) throwError("Product not found", 404);

    const wishlist = await this.getWishlist(userId);

    const exists = wishlist.products.some(
      p => p._id.toString() === productId
    );

    if (!exists) {
      wishlist.products.push(productId);
    }

    return this.wishlistRepository.save(wishlist);
  }

  async removeFromWishlist(userId, productId) {
    const wishlist = await this.getWishlist(userId);

    wishlist.products = wishlist.products.filter(
      p => p._id.toString() !== productId
    );

    return this.wishlistRepository.save(wishlist);
  }
}
