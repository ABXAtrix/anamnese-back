import type { FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import type IUser from "../../interfaces/IUser.js";
import type { IUserRepository } from "../../repositories/user/IUserRepository.js";
import type { UpdateUserDTO } from "../../dtos/user/UpdateUserDTO.js";
import { updateUserSchema } from "../../validations/user/updateUser.schema.js";

@injectable()
export default class UpdateUserService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ){}

  async execute(data: FastifyRequest["body"], params: { id: string }): Promise<IUser> {
    const parsedData: UpdateUserDTO = updateUserSchema.parse({...data as Record<string, any>, id: params.id});
    return await this.userRepository.update(parsedData);
  }
}
