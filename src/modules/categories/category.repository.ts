import { prisma } from "@/config/prisma"
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.types";


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

  async create({
    name
  }: CreateCategoryDTO) {
    return prisma.category.create({
      data: {
        name,
      },
    })
  },

  async update(id: string, {
    name,
  }: UpdateCategoryDTO) {
    return prisma.category.update({
      where: {
        id,
      },
      data: {
        name,
      },
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