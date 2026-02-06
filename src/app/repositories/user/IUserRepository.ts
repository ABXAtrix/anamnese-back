import type { CreateUserDTO } from "../../dtos/user/CreateUserDTO.js";
import type { UpdateUserDTO } from "../../dtos/user/UpdateUserDTO.js";
import type IUser from "../../interfaces/IUser.js";

export interface IUserRepository {
  create(data: CreateUserDTO): Promise<IUser>;
  update(data: UpdateUserDTO): Promise<IUser>;
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  getAll(): Promise<IUser[]>;
  delete(id: string): Promise<void>;
}
