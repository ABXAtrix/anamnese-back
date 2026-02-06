import type { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import type CreateUserService from "../services/user/CreateUserService.service.js";
import HttpResponse from "../../utils/http/httpResponse.js";
import type UpdateUserService from "../services/user/UpdateUserService.service.js";
import type DeleteUserService from "../services/user/DeleteUserService.service.js";

@injectable()
export class UserController {
  constructor(
    @inject("CreateUserService")
    private createUserService: CreateUserService,

    @inject("UpdateUserService")
    private updateUserService: UpdateUserService,

    @inject("DeleteUserService")
    private deleteUserService: DeleteUserService,
  ) {}

  //* POST /users
  async create(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.createUserService.execute(request.body);
    const response = HttpResponse.created(result, "Usuário criado com sucesso");
    return reply.status(response.statusCode).send(response.body);
  }

  //* PUT /users/:id
  async update(request: FastifyRequest, reply: FastifyReply) {
    const result = await this.updateUserService.execute({
      ...(request.body as Record<string, any>),
      id: (request.params as any).id
    });
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
