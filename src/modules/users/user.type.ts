import { Role } from "@/generated/prisma/client";
export interface createUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  id: string;
  role: Role;
}