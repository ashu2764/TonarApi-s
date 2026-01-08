import { OrderSchema } from "@ashu2764/tonar-db-schema";

export class OrderRepository {
  async create(data) {
    return OrderSchema.create(data);
  }

  async findByUser(userId) {
    return OrderSchema.find({ user: userId })
      .populate("items.product", "name")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });
  }

  async findById(id) {
    return OrderSchema.findById(id)
      .populate("items.product", "name")
      .populate("shippingAddress")
      .populate("user", "firstName lastName email");
  }

  async updateStatus(id, status) {
    return OrderSchema.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
  }
}
