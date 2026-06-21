import { Router } from "express";
import { productController } from "./product.controller";


const productRoutes = Router();

productRoutes.get('/', productController.findAllProducts);
productRoutes.get('/:id', productController.findProductById);
productRoutes.post('/', productController.createProduct);

export { productRoutes };