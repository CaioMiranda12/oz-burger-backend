import { AppError } from "@/shared/errors/AppError";
import { categoryRepository } from "./category.repository"
import { StatusCodes } from "http-status-codes";
import { CreateCategoryDTO, UpdateCategoryDTO } from "./category.types";

export const categoryService = {
  async findAll() {
    return categoryRepository.findAll();
  },

  async findById(id: string) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found', StatusCodes.NOT_FOUND);
    }

    return category;
  },

  async findByName(name: string) {
    const category = await categoryRepository.findByName(name);

    if (!category) {
      throw new AppError('Category not found', StatusCodes.NOT_FOUND);
    }

    return category;
  },

  async create({ name }: CreateCategoryDTO) {
    const categoryNameExists = await categoryRepository.findByName(name);

    if (categoryNameExists) {
      throw new AppError('Category with this name already exists', StatusCodes.CONFLICT);
    }

    return categoryRepository.create({ name });
  },

  async update(id: string, { name }: UpdateCategoryDTO) {
    const category = await this.findById(id);

    if (name && name !== category.name) {
      const categoryNameExists = await categoryRepository.findByName(name);

      if (categoryNameExists) {
        throw new AppError('Category with this name already exists', StatusCodes.CONFLICT);
      }
    }

    return categoryRepository.update(id, { name });
  },

  async delete(id: string) {
    await this.findById(id);

    return categoryRepository.delete(id);
  }
}