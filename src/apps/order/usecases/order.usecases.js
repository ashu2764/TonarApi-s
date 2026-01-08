import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { OrderRepository } from "../repository/order.repository.js";
import { CartRepository } from "../../cart/repository/cart.repository.js";
import { ProductRepository } from "../../products/repository/product.repository.js";

export class OrderUsecase {
  constructor() {
    this.orderRepository = new OrderRepository();
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async placeOrder(userId, addressId) {
    const cart = await this.cartRepository.findByUser(userId);
    if (!cart || cart.items.length === 0) {
      throwError("Cart is empty", 400);
    }

    let total = 0;
    const items = [];

   for (const item of cart.items) {
  const productId = item.product._id || item.product;

  const product = await this.productRepository.findById(productId);
  if (!product) {
    throwError("Product no longer exists", 404);
  }

  if (product.stock < item.quantity) {
    throwError(`Insufficient stock for ${product.name}`, 400);
  }

  product.stock -= item.quantity;
  await product.save();

  total += product.price * item.quantity;

  items.push({
    product: product._id,
    quantity: item.quantity,
    price: product.price
  });
}

    const order = await this.orderRepository.create({
      user: userId,
      items,
      totalAmount: total,
      shippingAddress: addressId
    });

    cart.items = [];
    await cart.save();

    return order;
  }

  async getOrders(userId) {
    return this.orderRepository.findByUser(userId);
  }

  async getOrderById(orderId, userId) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throwError("Order not found", 404);

    if (order.user._id.toString() !== userId) {
      throwError("Unauthorized", 403);
    }

    return order;
  }

  async cancelOrder(orderId, userId) {
    const order = await this.orderRepository.findById(orderId);
    if (!order) throwError("Order not found", 404);

    if (order.user._id.toString() !== userId) {
      throwError("Unauthorized", 403);
    }

    if (order.status !== "pending") {
      throwError("Order cannot be cancelled", 400);
    }

    return this.orderRepository.updateStatus(orderId, "cancelled");
  }
}
