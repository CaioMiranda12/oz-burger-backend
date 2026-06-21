import { productRepository } from "./product.repository"
import { createProductDTO } from "./product.types";


export const productService = {
  async findAll() {
    return productRepository.findAll();
  },

  async findById(id: string) {
    const product = productRepository.findById(id);

    if (!product) {
      return;
    }

    return product;
  },

  async create(data: createProductDTO) {
    const product = productRepository.create(data);

    return product;
  },
}