import { CategoryUsecase } from "../usecases/category.usecases.js";

export class CategoryController {
  constructor() {
    this.categoryUsecase = new CategoryUsecase();
  }

  async create(req, res, next) {
    try {
      const result = await this.categoryUsecase.createCategory(req.body);
      res.status(201).json({data:result, message: "Category created successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await this.categoryUsecase.getAllCategories();
      res.status(200).json({data:result, message: "Categories retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.categoryUsecase.updateCategory(
        req.params.id,
        req.body
      );
      res.status(200).json({data:result, message: "Category updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.categoryUsecase.deleteCategory(req.params.id);
      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
