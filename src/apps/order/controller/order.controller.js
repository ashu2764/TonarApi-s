import { OrderUsecase } from "../usecases/order.usecases.js";

export class OrderController {
  constructor() {
    this.orderUsecase = new OrderUsecase();
  }

  async create(req, res, next) {
    try {
      const result = await this.orderUsecase.placeOrder(
        req.user.id,
        req.body.addressId
      );
      res.status(201).json({data:result, message: "Order placed successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await this.orderUsecase.getOrders(req.user.id);
      res.status(200).json({data:result, message: "Orders retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await this.orderUsecase.getOrderById(
        req.params.id,
        req.user.id
      );
      res.status(200).json({data:result, message: "Order retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async cancel(req, res, next) {
    try {
      const result = await this.orderUsecase.cancelOrder(
        req.params.id,
        req.user.id
      );
      res.status(200).json({data:result, message: "Order canceled successfully" });
    } catch (error) {
      next(error);
    }
  }
}
