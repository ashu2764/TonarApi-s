import { AddressSchema } from "@ashu2764/tonar-db-schema";

export class AddressRepository {
  async create(payload) {
    return AddressSchema.create(payload);
  }

  async findByUser(userId) {
    return AddressSchema.find({ user: userId });
  }

  async updateById(id, payload) {
    return AddressSchema.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return AddressSchema.findByIdAndDelete(id);
  }

  async findById(id) {
    return AddressSchema.findById(id);
  }
}
