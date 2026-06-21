import { prisma } from "@/config/prisma"
import { createProductDTO, updateProductDTO } from "./product.types";


export const productRepository = {
  async findAll() {
    return prisma.product.findMany();
  },

  async findById(id: string) {
    const product = prisma.product.findUnique({
      where: {
        id,
      }
    })

    if (!product) {
      return;
    }

    return product;
  },

  async create(data: createProductDTO) {
    return prisma.product.create({
      data,
    })
  },
}