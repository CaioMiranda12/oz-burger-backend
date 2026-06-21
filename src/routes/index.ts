import { authRoutes } from "@/modules/auth/auth.routes";
import { productRoutes } from "@/modules/products/product.routes";
import { Request, Response, Router } from "express";

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello World!' });
})

routes.use('/products', productRoutes);
routes.use('/auth', authRoutes);

export { routes };