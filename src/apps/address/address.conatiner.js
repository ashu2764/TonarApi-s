import { createContainer, asClass } from "awilix";
import { AddressController } from "./controller/address.controller.js";
import { AddressUsecase } from "./usecases/address.usecases.js";
import { AddressRepository } from "./repository/address.repository.js";

export const addressContainer = createContainer();

addressContainer.register({
  addressRepository: asClass(AddressRepository).singleton(),
  addressUsecase: asClass(AddressUsecase).singleton(),
  addressController: asClass(AddressController).singleton(),
});
