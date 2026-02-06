import type { FastifyInstance } from "fastify";

export default async function healthRoutes(server: FastifyInstance) {
  server.get("/", async (request, reply) => {
    return { ok: true };
  });
}
