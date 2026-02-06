import { injectable } from "tsyringe";
import prisma from "../../../configs/database.js";
import type { CreateUserDTO } from "../../dtos/user/CreateUserDTO.js";
import type IUser from "../../interfaces/IUser.js";
import type { IUserRepository } from "./IUserRepository.js";
import type { UpdateUserDTO } from "../../dtos/user/UpdateUserDTO.js";

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: CreateUserDTO): Promise<IUser> {
    return await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async update(data: UpdateUserDTO): Promise<IUser> {
    return await prisma.user.update({
      where: { id: data.id },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }

  async findById(id: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async getAll(): Promise<IUser[]> {
    return await prisma.user.findMany();
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
    return;
  }
}
