import { AuthenticatedUser } from "@/modules/users/user.type";
import { AppError } from "@/shared/errors/AppError";
import { jwtUtils } from "@/shared/utils/jwt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', StatusCodes.UNAUTHORIZED);
  }

  const [, token] = authHeader.split(' ');

  try {
    req.user = jwtUtils.verify(token);
    return next();
  } catch {
    throw new AppError('Invalid token', StatusCodes.UNAUTHORIZED);
  }
}