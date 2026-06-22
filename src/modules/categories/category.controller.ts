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

  // async findCategoryByName(req: Request<{ name: string }>, res: Response) {
  //   const categoryName = req.params.name;
  //   const category = await categoryService.findByName(categoryName);

  //   return res.json(category);
  // },

  async create(req: Request, res: Response) {
    const validCategoryData = createCategorySchema.parse(req.body);
    const category = await categoryService.create(validCategoryData);

    return res.status(StatusCodes.CREATED).json(category);
  },

  async update(req: Request<{ id: string }>, res: Response) {
    const validCategoryData = updateCategorySchema.parse(req.body);
    const categoryId = req.params.id;
    const category = await categoryService.update(categoryId, validCategoryData);

    return res.json(category);
  },

  async delete(req: Request<{ id: string }>, res: Response) {
    const categoryId = req.params.id;
    await categoryService.delete(categoryId);

    return res.json({ message: "Category successfully deleted" });
  }
}