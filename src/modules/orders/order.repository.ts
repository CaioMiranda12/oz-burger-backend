import { prisma } from "@/config/prisma"
import { CreateOrderData } from "./order.types";
import { OrderStatus } from "@/generated/prisma/client";

export const orderRepository = {
  async findAll() {
    return prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true
          },
        },
      },
      orderBy: {
        createdAt: 'desc'
      },
    });
  },

  async findAllByUser(userId: string) {
    return prisma.order.findMany({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
    })
  },

  async findById(id: string) {
    return prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: true,
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          }
        },
      },
    });
  },

  async create({ userId, total, items }: CreateOrderData) {
    return prisma.order.create({
      data: {
        userId,
        total,
        items: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
          }
        }
      }
    })
  },

  async update(id: string, status: OrderStatus) {
    return prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      }
    })
  }
}