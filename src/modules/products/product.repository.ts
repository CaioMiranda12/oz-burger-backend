import { prisma } from "@/config/prisma"
import { CreateProductDTO, UpdateProductDTO } from "./product.types";


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

  async update(id: string, data: UpdateProductDTO) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
    })
  },

  async delete(id: string) {
    return prisma.product.delete({
      where: {
        id,
      }
    })
  },
}