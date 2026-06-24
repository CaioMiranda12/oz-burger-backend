import { Request, Response } from "express";
import { productService } from "./product.service";
import { createProductSchema, updateProductSchema } from "./product.schema";
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
    const { name, price, description, categoryId } = createProductSchema.parse(req.body);
    const product = await productService.create({
      name,
      price,
      description,
      categoryId
    });

    return res.status(StatusCodes.CREATED).json(product);
  },

  async updateProduct(req: Request<{ id: string }>, res: Response) {
    const { name, price, description, categoryId, available } = updateProductSchema.parse(req.body);
    const productId = req.params.id;

    const product = await productService.update(productId, { name, price, description, categoryId, available });

    return res.json(product);
  },

  async deleteProduct(req: Request<{ id: string }>, res: Response) {
    const productId = req.params.id;
    await productService.delete(productId);

    return res.json({ message: "Product successfully deleted" })
  }
}