import { prisma } from "@/config/prisma"
import { CreateProductDTO, UpdateProductDTO } from "./product.types";


export const productRepository = {
  async findAll() {
    return prisma.product.findMany({
      include: {
        category: true,
      }
    });
  },

  async findById(id: string) {
    return prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      }
    })
  },

  async create({
    name,
    price,
    description,
    categoryId
  }: CreateProductDTO) {
    return prisma.product.create({
      data: {
        name,
        price,
        description,
        categoryId,
      },
      include: {
        category: true,
      }
    })
  },

  async update(id: string, data: UpdateProductDTO) {
    return prisma.product.update({
      where: {
        id,
      },
      data,
      include: {
        category: true,
      }
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