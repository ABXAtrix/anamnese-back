import type { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { UserController } from "../app/controllers/user.controller.js";

export default async function userRoutes(server: FastifyInstance) {
  const userController = container.resolve(UserController);
  server.post("/", (request, reply) => userController.create(request, reply));
  server.get("/", (request, reply) => userController.getAll(request, reply));
  server.get("/:id", (request, reply) => userController.getById(request, reply));
  server.put("/:id", (request, reply) => userController.update(request, reply));
  server.delete("/:id", (request, reply) => userController.delete(request, reply));
}
