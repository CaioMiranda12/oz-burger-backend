import { Router } from "express";
import { productController } from "./product.controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { ensureRole } from "@/middlewares/ensureRole";


const productRoutes = Router();

productRoutes.get('/', productController.findAllProducts);
productRoutes.get('/:id', productController.findProductById);

const adminRoutes = Router();
// adicionar futuramente middleware de admin
adminRoutes.use(ensureAuthenticated, ensureRole("ADMIN"));
adminRoutes.post('/', productController.createProduct);
adminRoutes.put('/:id', productController.updateProduct);
adminRoutes.delete('/:id', productController.deleteProduct);

productRoutes.use(adminRoutes);

export { productRoutes };