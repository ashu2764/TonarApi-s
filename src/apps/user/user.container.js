import { createContainer, asClass } from "awilix";
import { UserController } from "./controller/user.controller.js";
import { UserUsecase } from "./usecases/user.usecases.js";
import { UserRepository } from "./repository/user.repositroy.js";

export const userContainer = createContainer();

userContainer.register({
  userRepository: asClass(UserRepository).singleton(),
  userUsecase: asClass(UserUsecase).singleton(),
  userController: asClass(UserController).singleton(),
});
