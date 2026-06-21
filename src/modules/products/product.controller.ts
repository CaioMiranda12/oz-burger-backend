import { Request, Response } from "express";
import { productService } from "./product.service";
import { createProductSchema } from "./product.schema";
import { StatusCodes } from "http-status-codes";

export const productController = {
  async findAllProducts(req: Request, res: Response) {
    const products = await productService.findAll();

    return res.json(products);
  },

  async findProductById(req: Request<{ id: string }>, res: Response) {
    const productId = req.params.id;
    const product = await productService.findById(productId);

    return res.json(product);
  },

  async createProduct(req: Request, res: Response) {
    const validProductData = createProductSchema.parse(req.body);
    const product = await productService.create(validProductData);

    return res.status(StatusCodes.CREATED).json(product);
  },
}