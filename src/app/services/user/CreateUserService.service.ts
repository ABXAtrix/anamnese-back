import type { FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import { createUserSchema } from "../../validations/user/createUser.schema.js";
import type { CreateUserDTO } from "../../dtos/user/CreateUserDTO.js";
import type IUser from "../../interfaces/IUser.js";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError.js";

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ){}

  async execute(data: FastifyRequest["body"]): Promise<Omit<IUser, "password">> {
    //TODO: Criar verificação de e-mail para criar um usuário apenas com e-mail válido
    const parsedData: CreateUserDTO = createUserSchema.parse(data);

    const userExists = await this.userRepository.findByEmail(parsedData.email);
    if (userExists) {
      throw new AppError("Email já cadastrado", 409);
    }

    parsedData.password = await bcrypt.hash(parsedData.password, 10);

    const user = await this.userRepository.create(parsedData);

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
