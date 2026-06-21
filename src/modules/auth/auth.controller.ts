import { Request, Response } from "express";
import { createUserSchema } from "../users/user.schema";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";


export const authController = {
  async registerUser(req: Request, res: Response) {
    const validUserData = createUserSchema.parse(req.body);

    const user = await authService.register(validUserData);

    return res.status(StatusCodes.CREATED).json(user);
  }
}