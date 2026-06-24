import { Request, Response } from "express";
import { orderService } from "./order.service";
import { StatusCodes } from "http-status-codes";


export const orderController = {
  async findAllOrders(req: Request, res: Response) {
    const orders = await orderService.findAll();

    return res.json(orders);
  },

  async findAllUserOrders(req: Request<{ userId: string }>, res: Response) {
    const userId = req.params.userId;
    const orders = await orderService.findAllByUser(userId)

    return res.json(orders);
  },

  async findOrderById(req: Request<{ id: string }>, res: Response) {
    const orderId = req.params.id;
    const order = await orderService.findById(orderId);

    return res.json(order);
  },

  async create(req: Request, res: Response) {
    const order = await orderService.create(req.body);

    return res.status(StatusCodes.CREATED).json(order);
  },

  async update(req: Request<{ id: string }>, res: Response) {
    const orderId = req.params.id;
    const order = await orderService.update(orderId, req.body);

    return res.json(order);
  }
}