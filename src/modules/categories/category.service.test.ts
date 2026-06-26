import { AppError } from '@/shared/errors/AppError';
import { categoryRepository } from './category.repository';
import { categoryService } from './category.service';

jest.mock('./category.repository');

describe('CategoryService', () => {
  describe('getById', () => {
    it('should return a category when it exists', async () => {
      const fakeCategory = {
        id: 'cat-1',
        name: 'Burgers'
      };

      (categoryRepository.findById as jest.Mock).mockResolvedValue(fakeCategory);

      const result = await categoryService.findById('cat-1');

      expect(result).toEqual(fakeCategory);
      expect(categoryRepository.findById).toHaveBeenCalledWith('cat-1');
    });

    it('should throw AppError when category does not exist', async () => {
      (categoryRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(categoryService.findById('cat-1')).rejects.toThrow(AppError);
    });
  });

  describe('create', () => {
    it('should create a category', async () => {
      const fakeCategory = {
        id: 'cat-1',
        name: 'Burgers'
      };

      (categoryRepository.create as jest.Mock).mockResolvedValue(fakeCategory);

      const result = await categoryService.create({ name: 'Burgers' });

      expect(result).toEqual(fakeCategory);
      expect(categoryRepository.create).toHaveBeenCalledWith({ name: 'Burgers' });
    });
  });
});