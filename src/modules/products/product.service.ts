import { AppError } from "@/shared/errors/AppError";
import { productRepository } from "./product.repository"
import { CreateProductDTO, UpdateProductDTO } from "./product.types";
import { StatusCodes } from "http-status-codes";
import { categoryService } from "../categories/category.service";

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

  async create({
    name,
    price,
    description,
    categoryId
  }: CreateProductDTO) {
    await categoryService.findById(categoryId);

    return productRepository.create({
      name,
      price,
      description,
      categoryId
    });
  },

  async update(
    id: string,
    {
      name,
      price,
      description,
      categoryId,
      available
    }: UpdateProductDTO
  ) {
    const product = await this.findById(id);

    if (categoryId) {
      await categoryService.findById(categoryId);
    }

    return productRepository.update(product.id, {
      name,
      price,
      description,
      categoryId,
      available
    });
  },

  async delete(id: string) {
    const product = await this.findById(id);

    return productRepository.delete(product.id);
  }
}