import { prisma } from "@/config/prisma"
import { createProductDTO } from "./product.types";


export const productRepository = {
  async findAll() {
    return await prisma.product.findMany();
  },

  async findById(id: string) {
    const product = await prisma.product.findUnique({
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
    return await prisma.product.create({
      data,
    })
  }
}