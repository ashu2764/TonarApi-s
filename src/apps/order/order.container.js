import { createContainer, asClass } from "awilix";
import { OrderController } from "./controller/order.controller.js";
import { OrderUsecase } from "./usecases/order.usecases.js";
import { OrderRepository } from "./repository/order.repository.js";

export const orderContainer = createContainer();

orderContainer.register({
  orderRepository: asClass(OrderRepository).singleton(),
  orderUsecase: asClass(OrderUsecase).singleton(),
  orderController: asClass(OrderController).singleton()
});
