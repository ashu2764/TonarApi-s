import { createContainer, asClass } from "awilix";
import { CategoryController } from "./controller/category.controller.js";
import { CategoryUsecase } from "./usecases/category.usecases.js";
import { CategoryRepository } from "./repository/category.repository.js";

export const categoryContainer = createContainer();

categoryContainer.register({
  categoryRepository: asClass(CategoryRepository).singleton(),
  categoryUsecase: asClass(CategoryUsecase).singleton(),
  categoryController: asClass(CategoryController).singleton()
});
