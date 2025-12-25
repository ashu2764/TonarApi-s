import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { AddressRepository } from "../repository/address.repository.js";

export class AddressUsecase {
  constructor() {
    this.addressRepository = new AddressRepository();
  }

  async createAddress(userId, payload) {
    payload.user = userId;
    return this.addressRepository.create({
    ...payload,
    user: userId
  });;
  }

  async getAddresses(userId) {
    return this.addressRepository.findByUser(userId);
  }

  async updateAddress(addressId, userId, payload) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) throwError("Address not found", 404);
    if (address.user.toString() !== userId.toString()) {
      throwError("Unauthorized", 403);
    }

    return this.addressRepository.updateById(addressId, payload);
  }

  async deleteAddress(addressId, userId) {
    const address = await this.addressRepository.findById(addressId);
    if (!address) throwError("Address not found", 404);

      if (address.user.toString() !== userId.toString()) {
      throwError("Unauthorized", 403);
    }

    await this.addressRepository.deleteById(addressId);
    return { message: "Address deleted successfully" };
  }
}
