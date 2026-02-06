import type { FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import { createUserSchema } from "../../validations/user/createUser.schema.js";
import type { CreateUserDTO } from "../../dtos/user/CreateUserDTO.js";
import type IUser from "../../interfaces/IUser.js";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import bcrypt from "bcrypt";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ){}

  async execute(data: FastifyRequest["body"]): Promise<IUser> {
    const parsedData: CreateUserDTO = createUserSchema.parse(data);

    parsedData.password = await bcrypt.hash(parsedData.password, 10);

    return await this.userRepository.create(parsedData);
  }
}
