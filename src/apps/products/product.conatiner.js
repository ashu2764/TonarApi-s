import { createContainer, asClass } from "awilix";
import { ProductController } from "./controller/product.controller.js";
import { ProductUsecase } from "./usecases/product.usecases.js";
import { ProductRepository } from "./repository/product.repository.js";

export const productContainer = createContainer();

productContainer.register({
  productRepository: asClass(ProductRepository).singleton(),
  productUsecase: asClass(ProductUsecase).singleton(),
  productController: asClass(ProductController).singleton()
});
