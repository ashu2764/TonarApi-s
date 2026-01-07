import { createContainer, asClass } from "awilix";
import { CartController } from "./controller/cart.controller.js";
import { CartUsecase } from "./usecases/cart.usecases.js";
import { CartRepository } from "./repository/cart.repository.js";

export const cartContainer = createContainer();

cartContainer.register({
  cartRepository: asClass(CartRepository).singleton(),
  cartUsecase: asClass(CartUsecase).singleton(),
  cartController: asClass(CartController).singleton()
});
