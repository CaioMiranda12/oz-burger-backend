import { Request, Response } from "express";
import { categoryService } from "./category.service";
import { StatusCodes } from "http-status-codes";
import { createCategorySchema, updateCategorySchema } from "./category.schema";


export const categoryController = {
  async findAllCategories(req: Request, res: Response) {
    const categories = await categoryService.findAll();

    return res.json(categories);
  },

  async findCategoryById(req: Request<{ id: string }>, res: Response) {
    const categoryId = req.params.id;
    const category = await categoryService.findById(categoryId);

    return res.json(category);
  },

  async create(req: Request, res: Response) {
    const { name } = createCategorySchema.parse(req.body);
    const category = await categoryService.create({ name });

    return res.status(StatusCodes.CREATED).json(category);
  },

  async update(req: Request<{ id: string }>, res: Response) {
    const { name } = updateCategorySchema.parse(req.body);
    const categoryId = req.params.id;
    const category = await categoryService.update(categoryId, { name });

    return res.json(category);
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    const categoryId = req.params.id;
    await categoryService.delete(categoryId);

    return res.json({ message: "Category successfully deleted" });
  }
}