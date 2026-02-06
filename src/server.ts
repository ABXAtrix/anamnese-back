import Fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import "reflect-metadata";
import "./container/index.js";
import { env } from "./configs/env.js";
import { errorHandler } from "./app/errors/errorHandler.js";
import healthRoutes from "./routes/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";

//* Settings
const server = Fastify({ logger: true });
await server.register(cors, { origin: env.FRONTEND_URL });
await server.register(jwt, { secret: env.JWT_SECRET });
server.setErrorHandler(errorHandler);

//^ Routes
server.register(healthRoutes, { prefix: "/health" }); //^ Health Check
server.register(userRoutes, { prefix: "/user" });
server.register(authRoutes, { prefix: "/auth" });

//* Start server
await server.listen({ port: env.PORT, host: "0.0.0.0" });
console.log(`🚀 http://localhost:${env.PORT}/`);
