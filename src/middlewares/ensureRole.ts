import { Role } from "@/generated/prisma/client";
import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export function ensureRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new AppError('Access denied', StatusCodes.UNAUTHORIZED);
    }

    return next();
  }
}