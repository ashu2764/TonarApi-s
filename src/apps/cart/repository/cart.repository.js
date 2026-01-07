import { CartSchema } from "@ashu2764/tonar-db-schema";

export class CartRepository {
  async findByUser(userId) {
    return CartSchema.findOne({ user: userId })
      .populate("items.product");
  }

  async create(userId) {
    return CartSchema.create({ user: userId, items: [] });
  }

  async save(cart) {
    return cart.save();
  }
}
