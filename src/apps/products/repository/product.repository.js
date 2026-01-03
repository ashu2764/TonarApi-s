import { ProductSchema } from "@ashu2764/tonar-db-schema";

export class ProductRepository {
  async create(payload) {
    return ProductSchema.create(payload);
  }

  async findAll(filter = {}) {
    return ProductSchema.find(filter)
      .populate("category", "name slug isActive")
      .populate("createdBy", "firstName lastName email");
  }

  async findById(id) {
    return ProductSchema.findById(id)
      .populate("category", "name slug isActive")
      .populate("createdBy", "firstName lastName email");
  }

  async updateById(id, data) {
    return ProductSchema.findByIdAndUpdate(id, data, { new: true })
      .populate("category", "name slug isActive")
      .populate("createdBy", "firstName lastName email");
  }

  async deleteById(id) {
    return ProductSchema.findByIdAndDelete(id);
  }
}
