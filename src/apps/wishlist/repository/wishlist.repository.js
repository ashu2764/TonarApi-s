import { WishlistSchema } from "@ashu2764/tonar-db-schema";

export class WishlistRepository {
  async findByUser(userId) {
    return WishlistSchema.findOne({ user: userId })
      .populate("products", "name");
  }

  async create(userId) {
    return WishlistSchema.create({ user: userId, products: [] });
  }

  async save(wishlist) {
    return wishlist.save();
  }
}
