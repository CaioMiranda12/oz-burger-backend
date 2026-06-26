import { authService } from './auth.service';
import { userRepository } from '@/modules/users/user.repository';
import { hashUtils } from '@/shared/utils/hash';
import { jwtUtils } from '@/shared/utils/jwt';
import { AppError } from '@/shared/errors/AppError';

jest.mock('@/modules/users/user.repository');
jest.mock('@/shared/utils/hash');
jest.mock('@/shared/utils/jwt');

describe('AuthService', () => {
  describe('register', () => {
    it('should create a user with hashed password and return a token', async () => {
      const input = { name: 'John', email: 'john@email.com', password: '123456' };
      const fakeUser = { id: 'user-1', name: 'John', email: 'john@email.com', role: 'CUSTOMER' };

      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);
      (hashUtils.hash as jest.Mock).mockResolvedValue('hashed-password');
      (userRepository.create as jest.Mock).mockResolvedValue(fakeUser);
      (jwtUtils.sign as jest.Mock).mockReturnValue('fake-token');

      const result = await authService.register(input);

      expect(hashUtils.hash).toHaveBeenCalledWith('123456');
      expect(userRepository.create).toHaveBeenCalledWith({
        ...input,
        password: 'hashed-password',
      });
      expect(result).toEqual({
        user: { id: 'user-1', name: 'John', email: 'john@email.com' },
        token: 'fake-token',
      });
    });

    it('should throw AppError when email is already in use', async () => {
      const input = { name: 'John', email: 'john@email.com', password: '123456' };
      (userRepository.findByEmail as jest.Mock).mockResolvedValue({ id: 'existing-user' });

      await expect(authService.register(input)).rejects.toThrow(AppError);
      expect(userRepository.create).not.toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('should return user and token when credentials are valid', async () => {
      const fakeUser = {
        id: 'user-1',
        name: 'John',
        email: 'john@email.com',
        password: 'hashed-password',
        role: 'CUSTOMER',
      };

      (userRepository.findByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (hashUtils.compare as jest.Mock).mockResolvedValue(true);
      (jwtUtils.sign as jest.Mock).mockReturnValue('fake-token');

      const result = await authService.login('john@email.com', '123456');

      expect(result).toEqual({
        user: { id: 'user-1', name: 'John', email: 'john@email.com' },
        token: 'fake-token',
      });
    });

    it('should throw AppError when user does not exist', async () => {
      (userRepository.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(authService.login('notfound@email.com', '123456')).rejects.toThrow(AppError);
    });

    it('should throw AppError when password does not match', async () => {
      const fakeUser = { id: 'user-1', email: 'john@email.com', password: 'hashed-password' };

      (userRepository.findByEmail as jest.Mock).mockResolvedValue(fakeUser);
      (hashUtils.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('john@email.com', 'wrong-password')).rejects.toThrow(
        AppError,
      );
    });
  });
});