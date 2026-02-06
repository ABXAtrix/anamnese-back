import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import { deleteUserSchema } from "../../validations/user/deleteUser.schema.js";

@injectable()
export default class DeleteUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(params: { id: string }): Promise<void> {
    const { id } = deleteUserSchema.parse({ id: params.id });
    await this.userRepository.delete(id);
    return;
  }
}
