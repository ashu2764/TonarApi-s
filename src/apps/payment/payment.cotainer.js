import { createContainer, asClass } from "awilix";
import { PaymentController } from "./controller/payment.controller.js";
import { PaymentUsecase } from "./usecases/payment.usecases.js";
import { PaymentRepository } from "./repository/payment.repository.js";

export const paymentContainer = createContainer();

paymentContainer.register({
  paymentRepository: asClass(PaymentRepository).singleton(),
  paymentUsecase: asClass(PaymentUsecase).singleton(),
  paymentController: asClass(PaymentController).singleton()
});
