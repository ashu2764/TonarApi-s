import { ProductSchema } from "@ashu2764/tonar-db-schema";

export class ProductRepository {
  async create(payload) {
    return ProductSchema.create(payload);
  }

  async findAll() {
    return ProductSchema.find({ isActive: true });
  }

  async findById(id) {
    return ProductSchema.findById(id);
  }

  async updateById(id, payload) {
    return ProductSchema.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
  }

  async deleteById(id) {
    return ProductSchema.findByIdAndDelete(id);
  }
}
