import { CartUsecase } from "../usecases/cart.usecases.js";

export class CartController {
  constructor() {
    this.cartUsecase = new CartUsecase();
  }

  async get(req, res, next) {
    try {
      const result = await this.cartUsecase.getCart(req.user.id);
      res.status(200).json({data:result, message: "Cart retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async add(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const result = await this.cartUsecase.addToCart(
        req.user.id,
        productId,
        quantity || 1
      );
      res.status(200).json({data:result, message: "Product added to cart successfully" });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { productId, quantity } = req.body;
      const result = await this.cartUsecase.updateCart(
        req.user.id,
        productId,
        quantity
      );
      res.status(200).json({data:result, message: "Cart updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const result = await this.cartUsecase.removeFromCart(
        req.user.id,
        req.params.productId
      );
      res.status(200).json({data:result, message: "Product removed from cart successfully" });
    } catch (error) {
      next(error);
    }
  }
}
