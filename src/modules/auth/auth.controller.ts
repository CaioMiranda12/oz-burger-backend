import { Request, Response } from "express";
import { createUserSchema, loginUserSchema } from "../users/user.schema";
import { StatusCodes } from "http-status-codes";
import { authService } from "./auth.service";


export const authController = {
  async registerUser(req: Request, res: Response) {
    const validUserData = createUserSchema.parse(req.body);

    const user = await authService.register(validUserData);

    return res.status(StatusCodes.CREATED).json(user);
  },

  async loginUser(req: Request, res: Response) {
    const { email, password } = loginUserSchema.parse(req.body);

    const loggedUser = await authService.login(email, password);

    return res.json(loggedUser);
  },
}