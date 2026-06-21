import { AppError } from "@/shared/errors/AppError";
import { productRepository } from "./product.repository"
import { createProductDTO } from "./product.types";
import { StatusCodes } from "http-status-codes";


export const productService = {
  async findAll() {
    return await productRepository.findAll();
  },

  async findById(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', StatusCodes.NOT_FOUND);
    }

    return product;
  },

  async create(data: createProductDTO) {
    const product = await productRepository.create(data);

    return product;
  },
}