import { AppError } from "@/shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodError } from "zod";


export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if (error instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: 'Validation Error',
      issues: error.issues.map(issue => ({
        path: issue.path.join('.'),
        message: issue.message
      }))
    })
  }

  console.error(error);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
}