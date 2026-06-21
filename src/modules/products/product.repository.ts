import { prisma } from "@/config/prisma"
import { CreateProductDTO } from "./product.types";


export const productRepository = {
  async findAll() {
    return prisma.product.findMany();
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      }
    })
  },

  async create(data: CreateProductDTO) {
    return prisma.product.create({
      data,
    })
  },
}