import { inject, injectable } from "tsyringe";
import type IUser from "../../interfaces/IUser.js";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import type { UpdateUserDTO } from "../../dtos/user/UpdateUserDTO.js";
import { updateUserSchema } from "../../validations/user/updateUser.schema.js";
import bcrypt from "bcrypt";
import { AppError } from "../../errors/appError.js";

@injectable()
export default class UpdateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(data: any): Promise<Omit<IUser, "password">> {
    // Valida os dados com Zod
    const parsedData: UpdateUserDTO = updateUserSchema.parse(data);

    // Verifica se o usuário existe
    const user = await this.userRepository.findById(parsedData.id);
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    // Se o email foi fornecido e é diferente do atual, valida se já existe
    if (parsedData.email && parsedData.email !== user.email) {
      const emailExists = await this.userRepository.findByEmail(parsedData.email);
      if (emailExists) {
        throw new AppError("Email já cadastrado", 409);
      }
    }

    // Se a senha foi fornecida, faz o hash
    if (parsedData.password) {
      parsedData.password = await bcrypt.hash(parsedData.password, 10);
    }

    // Atualiza o usuário
    const updatedUser = await this.userRepository.update(parsedData);

    // Remove a senha da resposta
    const { password, ...userWithoutPassword } = updatedUser;
    return userWithoutPassword;
  }
}
