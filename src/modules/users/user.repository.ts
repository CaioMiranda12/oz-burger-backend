import { prisma } from "@/config/prisma";
import { createUserDTO } from "./user.type";

export const userRepository = {
  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      }
    })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: {
        email,
      }
    })
  },

  async create({
    name,
    email,
    password
  }: createUserDTO) {
    return prisma.user.create({
      data: {
        name,
        email,
        password
      },
    })
  },
}