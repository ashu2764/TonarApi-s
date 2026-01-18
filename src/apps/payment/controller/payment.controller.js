import { PaymentUsecase } from "../usecases/payment.usecases.js";

export class PaymentController {
  constructor() {
    this.paymentUsecase = new PaymentUsecase();
  }

  async create(req, res, next) {
    try {
      const result = await this.paymentUsecase.createPayment(
        req.body.orderId
      );
      res.status(201).json({data: result, message: "Payment order created successfully"});
    } catch (error) {
      next(error);
    }
  }

  async verify(req, res, next) {
    try {
      const result = await this.paymentUsecase.verifyPayment(req.body);
      res.status(200).json({data: result, message: "Payment verified successfully"});
    } catch (error) {
      next(error);
    }
  }

  async status(req, res, next) {
    try {
      const result = await this.paymentUsecase.getPaymentStatus(
        req.params.orderId
      );
      res.status(200).json({data: result, message: "Payment status fetched successfully"});
    } catch (error) {
      next(error);
    }
  }
}
