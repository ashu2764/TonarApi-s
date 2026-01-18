import crypto from "crypto";
import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { razorpay } from "../../../infrastructure/payment/razorpay.js";
import { PaymentRepository } from "../repository/payment.repository.js";
import { OrderRepository } from "../../order/repository/order.repository.js";

export class PaymentUsecase {
  constructor() {
    this.paymentRepository = new PaymentRepository();
    this.orderRepository = new OrderRepository();
  }

  async createPayment(orderId) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throwError("Order not found", 404);

    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100, // paise
      currency: "INR",
      receipt: orderId
    });

    return this.paymentRepository.create({
      order: orderId,
      razorpayOrderId: razorpayOrder.id,
      amount: order.totalAmount

    });
  }

  async verifyPayment(payload) {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    } = payload;

    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      throwError("Invalid payment signature", 400);
    }

    const payment = await this.paymentRepository.findByOrder(
      payload.orderId
    );
    console.log("----->",payment);
    await this.paymentRepository.update(payment._id, {
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      status: "paid"
    });

    await this.orderRepository.updateStatus(
      payment.order,
      "paid"
    );

    return { message: "Payment verified successfully" };
  }

  async getPaymentStatus(orderId) {
    return this.paymentRepository.findByOrder(orderId);
  }
}
