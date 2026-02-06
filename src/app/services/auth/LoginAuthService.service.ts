import type { FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import { loginAuthSchema } from "../../validations/auth/loginAuth.schema.js";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import { AppError } from "../../errors/appError.js";
import type IUser from "../../interfaces/IUser.js";
import type LoginAuthDTO from "../../dtos/auth/LoginAuthDTO.js";

@injectable()
export default class LoginAuthService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: FastifyRequest["body"]): Promise<Omit<IUser, "password">> {
    const parsedData: LoginAuthDTO = loginAuthSchema.parse(data);

    const user = await this.userRepository.findByEmail(parsedData.email);

    if (!user) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const passwordMatch = await bcrypt.compare(
      parsedData.password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha inválidos", 401);
    }

    const { password, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}
