import { AppError } from "@/shared/errors/AppError";
import { productRepository } from "./product.repository";
import { productService } from "./product.service";
import { categoryRepository } from "../categories/category.repository";

jest.mock('./product.repository');
jest.mock('../categories/category.repository');

describe('Product Service', () => {
  describe('findById', () => {
    it('should return a product when it exists', async () => {
      const fakeProduct = {
        id: '1',
        name: 'X-Burger',
        price: 25
      };

      (productRepository.findById as jest.Mock).mockResolvedValue(fakeProduct);

      const result = await productService.findById(fakeProduct.id);

      expect(result).toEqual(fakeProduct);
      expect(productRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw AppError when product does not exist', async () => {
      (productRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(productService.findById('1')).rejects.toThrow(AppError);
    });
  });

  describe('create', () => {
    it('should create a product when category exists', async () => {
      const fakeCategory = {
        id: 'cat-1',
        name: 'Burgers'
      };

      const fakeProduct = {
        id: '1',
        name: 'X-Burger',
        categoryId: 'cat-1'
      };

      const input = {
        name: 'X-Burger',
        description: 'Delicious burger',
        price: 25,
        categoryId: 'cat-1',
      };

      (categoryRepository.findById as jest.Mock).mockResolvedValue(fakeCategory);
      (productRepository.create as jest.Mock).mockResolvedValue(fakeProduct);

      const result = await productService.create(input);

      expect(result).toEqual(fakeProduct);
      expect(categoryRepository.findById).toHaveBeenCalledWith('cat-1');
      expect(productRepository.create).toHaveBeenCalledWith(input);
    });

    it('should throw AppError when category does not exist', async () => {
      (categoryRepository.findById as jest.Mock).mockResolvedValue(null);
      await expect(
        productService.create({
          name: 'X-Burger',
          description: 'Delicious burger',
          price: 25,
          categoryId: 'invalid-cat',
        }))
        .rejects.toThrow(AppError);

      expect(productRepository.create).not.toHaveBeenCalled();
    })
  })
})