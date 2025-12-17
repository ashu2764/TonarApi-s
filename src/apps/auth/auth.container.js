import { createContainer, asClass } from "awilix";
import { AuthController } from "./controller/auth.controller.js";
import { AuthUsecase } from "./usecases/auth.usecases.js";
import { AuthRepository } from "./repository/auth.repository.js";

export const authContainer = createContainer();

authContainer.register({
  authRepository: asClass(AuthRepository).singleton(),
  authUsecase: asClass(AuthUsecase).singleton(),
  authController: asClass(AuthController).singleton(),
});