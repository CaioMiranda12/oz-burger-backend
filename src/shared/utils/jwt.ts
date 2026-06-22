import { AuthenticatedUser } from '@/modules/users/user.type';
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET as string;
const EXPIRES_IN = '1d';

export const jwtUtils = {
  sign(payload: AuthenticatedUser) {
    return jwt.sign(payload, JWT_SECRET as string, { expiresIn: EXPIRES_IN });
  },

  verify(token: string): AuthenticatedUser {
    return jwt.verify(token, JWT_SECRET) as AuthenticatedUser;
  },
}