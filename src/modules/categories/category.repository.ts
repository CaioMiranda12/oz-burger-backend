import { prisma } from "@/config/prisma"
import { createCategoryDTO, updateCategoryDTO } from "./category.types";


export const categoryRepository = {
  async findAll() {
    return prisma.category.findMany();
  },

  async findById(id: string) {
    return prisma.category.findUnique({
      where: {
        id,
      }
    })
  },

  async findByName(name: string) {
    return prisma.category.findUnique({
      where: {
        name,
      }
    })
  },

  async create(data: createCategoryDTO) {
    return prisma.category.create({
      data,
    })
  },

  async update(id: string, data: updateCategoryDTO) {
    return prisma.category.update({
      where: {
        id,
      },
      data,
    })
  },

  async delete(id: string) {
    return prisma.category.delete({
      where: {
        id,
      }
    })
  }
}