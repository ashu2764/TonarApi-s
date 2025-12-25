import { AddressUsecase } from "../usecases/address.usecases.js";

export class AddressController {
  constructor() {
    this.addressUsecase = new AddressUsecase();
  }

  async create(req, res, next) {
    try {
      const result = await this.addressUsecase.createAddress(
        req.user.id,
        req.body
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await this.addressUsecase.getAddresses(req.user.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const result = await this.addressUsecase.updateAddress(
        req.params.id,
        req.user.id,
        req.body
      );

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.addressUsecase.deleteAddress(
        req.params.id,
        req.user.id
      );
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
