import { Router } from "express";
import { categoryController } from "./category.controller";
import { ensureAuthenticated } from "@/middlewares/ensureAuthenticated";
import { ensureRole } from "@/middlewares/ensureRole";

const categoryRoutes = Router();

categoryRoutes.get('/', categoryController.findAllCategories);
categoryRoutes.get('/:id', categoryController.findCategoryById);
categoryRoutes.get('/:name', categoryController.findCategoryByName);

const adminRoutes = Router();
adminRoutes.use(ensureAuthenticated, ensureRole('ADMIN'));

adminRoutes.post('/', categoryController.create);
adminRoutes.put('/:id', categoryController.update);
adminRoutes.delete('/:id', categoryController.delete);

categoryRoutes.use(adminRoutes);

export { categoryRoutes };