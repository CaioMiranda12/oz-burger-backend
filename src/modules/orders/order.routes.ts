import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { ensureRole } from "@/middlewares/ensureRole";
import { Router } from "express";
import { orderController } from "./order.controller";

const orderRoutes = Router();

orderRoutes.use(ensureAuthenticated, ensureRole('ADMIN'));

orderRoutes.get('/', orderController.findAllOrders);
orderRoutes.get('/user/:userId', orderController.findAllUserOrders);
orderRoutes.get('/:id', orderController.findOrderById);
orderRoutes.post('/', orderController.create);
orderRoutes.put('/:id', orderController.update);

export { orderRoutes };