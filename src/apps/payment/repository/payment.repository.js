import { PaymentSchema } from "@ashu2764/tonar-db-schema";

export class PaymentRepository {
  async create(data) {
    return PaymentSchema.create(data);
  }

  async findByOrder(orderId) {
    return PaymentSchema.findOne({ order: orderId });
  }

  async update(id, data) {
    return PaymentSchema.findByIdAndUpdate(id, data, { new: true });
  }
}
