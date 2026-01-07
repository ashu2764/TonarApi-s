import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { CartRepository } from "../repository/cart.repository.js";
import { ProductRepository } from "../../products/repository/product.repository.js";

export class CartUsecase {
  constructor() {
    this.cartRepository = new CartRepository();
    this.productRepository = new ProductRepository();
  }

  async getCart(userId) {
    let cart = await this.cartRepository.findByUser(userId);
    if (!cart) {
      cart = await this.cartRepository.create(userId);
    }
    return cart;
  }

  async addToCart(userId, productId, quantity) {
    const product = await this.productRepository.findById(productId);
    if (!product) throwError("Product not found", 404);

    let cart = await this.getCart(userId);

    const item = cart.items.find(
      i => i.product._id.toString() === productId
    );

    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    return this.cartRepository.save(cart);
  }

  async updateCart(userId, productId, quantity) {
    const cart = await this.getCart(userId);

    const item = cart.items.find(
      i => i.product._id.toString() === productId
    );

    if (!item) throwError("Item not found in cart", 404);

    item.quantity = quantity;
    return this.cartRepository.save(cart);
  }

  async removeFromCart(userId, productId) {
    const cart = await this.getCart(userId);

    cart.items = cart.items.filter(
      i => i.product._id.toString() !== productId
    );

    return this.cartRepository.save(cart);
  }
}
