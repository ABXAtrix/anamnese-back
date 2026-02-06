import { inject, injectable } from "tsyringe";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import type IUser from "../../interfaces/IUser.js";

@injectable()
export class GetAllUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute(): Promise<IUser[]> {
    return await this.userRepository.getAll();
  }
}
