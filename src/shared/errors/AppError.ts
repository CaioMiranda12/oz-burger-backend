import { StatusCodes } from "http-status-codes";


export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = StatusCodes.BAD_REQUEST
  ) {
    super(message);
  }
}