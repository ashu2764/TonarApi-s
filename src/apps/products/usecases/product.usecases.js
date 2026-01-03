import throwError from "../../../infrastructure/error-handling/throw-error.js";
import { ProductRepository } from "../repository/product.repository.js";

export class ProductUsecase {
  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(adminId, payload) {
    payload.createdBy = adminId;
    return this.productRepository.create(payload);
  }

  async getProducts() {
    return this.productRepository.findAll();
  }

  async getProductById(id) {
    const product = await this.productRepository.findById(id);
    if (!product) throwError("Product not found", 404);
    return product;
  }

  async updateProduct(id, payload) {
    const product = await this.productRepository.updateById(id, payload);
    if (!product) throwError("Product not found", 404);

    if (payload.images?.length) {
      payload.images = [...product.images, ...payload.images];
    } else {
      delete payload.images;
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await this.productRepository.findById(id);
    if (!product) throwError("Product not found", 404);

    await this.productRepository.deleteById(id);
    return { message: "Product deleted successfully" };
  }
}
