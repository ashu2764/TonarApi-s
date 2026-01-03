import { ProductUsecase } from "../usecases/product.usecases.js";

export class ProductController {
  constructor() {
    this.productUsecase = new ProductUsecase();
  }

  async create(req, res, next) {
    try {
      const images = req.files.map((file) => file.path);
      const result = await this.productUsecase.createProduct(
        req.user.id,
        {
          ...req.body,
          images
        }

      );
      res.status(201).json({data:result, message: "Product created successfully"  });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const result = await this.productUsecase.getProducts();
      res.status(200).json({data:result, message: "Products retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const result = await this.productUsecase.getProductById(req.params.id);
      res.status(200).json({data:result, message: "Product retrieved successfully"});
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {

      const newImages = req.files?.map(file => file.path) || [];
      const result = await this.productUsecase.updateProduct(
        req.params.id,
        {
          ...req.body,
          images: newImages
        }
      );
      res.status(200).json({data:result, message: "Product updated successfully" });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const result = await this.productUsecase.deleteProduct(req.params.id);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
