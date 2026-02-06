import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import { deleteUserSchema } from "../../validations/user/deleteUser.schema.js";
import { AppError } from "../../errors/appError.js";

@injectable()
export default class DeleteUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = deleteUserSchema.parse({ id: params.id });

    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new AppError("Usuário não encontrado", 404);
    }

    await this.userRepository.delete(id);
    return;
  }
}
