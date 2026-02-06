import type { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import type CreateUserService from "../services/user/CreateUserService.service.js";
import HttpResponse from "../../utils/http/httpResponse.js";
import type UpdateUserService from "../services/user/UpdateUserService.service.js";
import type DeleteUserService from "../services/user/DeleteUserService.service.js";
import type { FindByIdUserService } from "../services/user/FindByIdUserService.service.js";
import type { GetAllUserService } from "../services/user/GetAllUserService.service.js";

@injectable()
export class UserController {
  constructor(
    @inject("CreateUserService")
    private createUserService: CreateUserService,

    @inject("UpdateUserService")
    private updateUserService: UpdateUserService,

    @inject("DeleteUserService")
    private deleteUserService: DeleteUserService,

    @inject("FindByIdUserService")
    private findByIdUserService: FindByIdUserService,

    @inject("GetAllUserService")
    private getAllUsersService: GetAllUserService,
  ) {}

  //* GET /users
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.getAllUsersService.execute();
    const response = HttpResponse.ok(result, "Usuários encontrados com sucesso!");
    return reply.status(response.statusCode).send(response.body);
  }

  //* GET /users/:id
  async getById(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.findByIdUserService.execute(request.params as { id: string });
    const response = HttpResponse.ok(result, "Usuário encontrado com sucesso!");
    return reply.status(response.statusCode).send(response.body);
  }

  //* POST /users
  async create(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.createUserService.execute(request.body);
    const response = HttpResponse.created(result, "Usuário criado com sucesso");
    return reply.status(response.statusCode).send(response.body);
  }

  //* PUT /users/:id
  async update(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.updateUserService.execute(request.body, request.params as { id: string });
    const response = HttpResponse.ok(result, "Usuário atualizado com sucesso!");
    return reply.status(response.statusCode).send(response.body);
  }

  //* DELETE /users/:id
  async delete(request: FastifyRequest, reply: FastifyReply) {
    await this.deleteUserService.execute(request.params as { id: string });
    const response = HttpResponse.ok(null, "Usuário deletado com sucesso!");
    return reply.status(response.statusCode).send();
  }
}
