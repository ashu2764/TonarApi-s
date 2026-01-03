import { CategorySchema } from "@ashu2764/tonar-db-schema";

export class CategoryRepository {
  async create(data) {
    return CategorySchema.create(data);
  }

  async findAll() {
    return CategorySchema.find({ isActive: true }).sort({ name: 1 });
  }

  async findById(id) {
    return CategorySchema.findById(id);
  }

  async findBySlug(slug) {
    return CategorySchema.findOne({ slug });
  }

  async updateById(id, data) {
    return CategorySchema.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return CategorySchema.findByIdAndDelete(id);
  }
}
