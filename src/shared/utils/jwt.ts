import jwt from 'jsonwebtoken'

export const jwtUtils = {
  sign(payload: { id: string, role: string }) {
    return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1d' });
  },

  verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  },
}