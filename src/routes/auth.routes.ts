import type { FastifyInstance } from "fastify";
import { container } from "tsyringe";
import { AuthController } from "../app/controllers/auth.controller.js";

export default async function authRoutes(server: FastifyInstance) {
  const authController = container.resolve(AuthController);

  server.post("/login", (request, reply) => authController.login(request, reply));
  server.post("/refresh", (request, reply) => authController.refreshToken(request, reply));
  server.post("/logout", (request, reply) => authController.logout(request, reply));
  server.get("/me", (request, reply) => authController.me(request, reply));
  server.post("/forgot-password", (request, reply) => authController.forgotPassword(request, reply));
  server.post("/reset-password", (request, reply) => authController.resetPassword(request, reply));
}
