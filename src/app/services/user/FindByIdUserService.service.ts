import { inject, injectable } from "tsyringe";
import { findByIdUserSchema } from "../../validations/user/findByIdUser.schema.js";
import type IUser from "../../interfaces/IUser.js";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";

@injectable()
export class FindByIdUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(params: { id: string }): Promise<IUser | null> {
    const { id } = findByIdUserSchema.parse({ id: params.id });
    return await this.userRepository.findById(id);
  }
}
