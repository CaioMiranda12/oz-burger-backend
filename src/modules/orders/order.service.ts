import { AppError } from "@/shared/errors/AppError";
import { orderRepository } from "./order.repository"
import { StatusCodes } from "http-status-codes";
import { OrderStatus } from "@/generated/prisma/client";
import { productRepository } from "../products/product.repository";


export const orderService = {
  async findAll() {
    return orderRepository.findAll();
  },

  async findAllByUser(userId: string) {
    return orderRepository.findAllByUser(userId);
  },

  async findById(id: string) {
    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found', StatusCodes.NOT_FOUND);
    }

    return order;
  },

  async create(userId: string, items: { productId: string; quantity: number }[]) {
    const resolvedItems = await Promise.all(
      items.map(async (item) => {
        const product = await productRepository.findById(item.productId);

        if (!product) {
          throw new AppError(`Product ${item.productId} not found`, StatusCodes.NOT_FOUND);
        }

        if (!product.available) {
          throw new AppError(`Product ${product.name} is not available`, StatusCodes.BAD_REQUEST);
        }

        return {
          productId: product.id,
          quantity: item.quantity,
          unitPrice: Number(product.price),
        };
      }),
    );

    const total = resolvedItems.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0,
    );

    return orderRepository.create({ userId, total, items: resolvedItems });
  },

  async update(id: string, status: OrderStatus) {
    await this.findById(id);

    return orderRepository.update(id, status);
  },
}