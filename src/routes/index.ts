import { authRoutes } from "@/modules/auth/auth.routes";
import { categoryRoutes } from "@/modules/categories/category.routes";
import { orderRoutes } from "@/modules/orders/order.routes";
import { productRoutes } from "@/modules/products/product.routes";
import { Request, Response, Router } from "express";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World!' });
})

routes.use('/products', productRoutes);
routes.use('/auth', authRoutes);
routes.use('/categories', categoryRoutes);
routes.use('/orders', orderRoutes);

export { routes };