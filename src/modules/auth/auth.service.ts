import { AppError } from "@/shared/errors/AppError";
import { userRepository } from "../users/user.repository";
import { createUserDTO } from "../users/user.type";
import { StatusCodes } from "http-status-codes";
import { hashUtils } from "@/shared/utils/hash";
import { jwtUtils } from "@/shared/utils/jwt";


export const authService = {
  async register({
    name,
    email,
    password
  }: createUserDTO) {
    const userEmailExists = await userRepository.findByEmail(email);

    if (userEmailExists) {
      throw new AppError('Email already in use', StatusCodes.CONFLICT);
    }

    const hashedPassword = await hashUtils.hash(password);

    const user = await userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwtUtils.sign({
      id: user.id,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const validPassword = await hashUtils.compare(password, user.password);

    if (!validPassword) {
      throw new AppError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }

    const token = jwtUtils.sign({
      id: user.id,
      role: user.role,
    })

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    }
  }
}