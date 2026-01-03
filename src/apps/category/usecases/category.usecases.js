import slugify from "slugify";
import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { CategoryRepository } from "../repository/category.repository.js";

export class CategoryUsecase {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createCategory(payload) {
    const slug = slugify(payload.name, { lower: true });

    const existing = await this.categoryRepository.findBySlug(slug);
    if (existing) throwError("Category already exists", 400);

    return this.categoryRepository.create({
      name: payload.name,
      slug
    });
  }

  async getAllCategories() {
    return this.categoryRepository.findAll();
  }

  async updateCategory(id, payload) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throwError("Category not found", 404);

    const data = {
      name: payload.name ?? category.name,
      isActive: payload.isActive ?? category.isActive
    };

    if (payload.name) {
      data.slug = slugify(payload.name, { lower: true });
    }

    return this.categoryRepository.updateById(id, data);
  }

  async deleteCategory(id) {
    const category = await this.categoryRepository.findById(id);
    if (!category) throwError("Category not found", 404);

    return this.categoryRepository.deleteById(id);
  }
}
