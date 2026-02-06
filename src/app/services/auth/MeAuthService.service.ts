import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import type IUser from "../../interfaces/IUser.js";
import { AppError } from "../../errors/appError.js";

@injectable()
export class MeAuthService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(userId: string): Promise<Omit<IUser, "password">> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
