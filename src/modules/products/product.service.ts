import { AppError } from "@/shared/errors/AppError";
import { productRepository } from "./product.repository"
import { CreateProductDTO, UpdateProductDTO } from "./product.types";
import { StatusCodes } from "http-status-codes";


export const productService = {
  async findAll() {
    return productRepository.findAll();
  },

  async findById(id: string) {
    const product = await productRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found', StatusCodes.NOT_FOUND);
    }

    return product;
  },

  async create(data: CreateProductDTO) {
    return productRepository.create(data);
  },

  async update(id: string, data: UpdateProductDTO) {
    const product = await this.findById(id);

    return productRepository.update(product.id, data);
  },

  async delete(id: string) {
    const product = await this.findById(id);

    return productRepository.delete(product.id);
  }
}