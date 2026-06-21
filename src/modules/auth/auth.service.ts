import { AppError } from "@/shared/errors/AppError";
import { userRepository } from "../users/user.repository";
import { createUserDTO } from "../users/user.type";
import { StatusCodes } from "http-status-codes";
import { hashUtils } from "@/shared/utils/hash";
import { jwtUtils } from "@/shared/utils/jwt";


export const authService = {
  async register(data: createUserDTO) {
    const userEmailExists = await userRepository.findByEmail(data.email);

    if (userEmailExists) {
      throw new AppError('Email already in use', StatusCodes.CONFLICT);
    }

    const hashedPassword = await hashUtils.hash(data.password);

    const user = await userRepository.create({
      ...data,
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
}