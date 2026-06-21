import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const hashUtils = {
  hash(plain: string) {
    return bcrypt.hash(plain, SALT_ROUNDS);
  },

  compare(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
}