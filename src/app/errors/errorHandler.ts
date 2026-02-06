import type { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";
import HttpResponse from "../../utils/http/httpResponse.js";
import { AppError } from "./appError.js";
import { Prisma } from "@prisma/client";

export function errorHandler(
  error: any,
  request: FastifyRequest,
  reply: FastifyReply
) {
  //* Erros Personalizados
  if (error instanceof AppError) {
    const response = {
      ...(error.data && { data: error.data }),
      message: error.message,
    };

    return reply.code(error.statusCode).send(response);
  }

  //* Erros de Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    let response;

    switch (error.code) {
      case "P2002":
        response = HttpResponse.conflict(
          null,
          "O Registro já existe no banco de dados."
        );
        return reply.code(response.statusCode).send(response.body);
      case "P2025":
        response = HttpResponse.notFound(
          null,
          "O Registro não foi encontrado no banco de dados."
        );
        return reply.code(response.statusCode).send(response.body);
      case "P2003":
        response = HttpResponse.badRequest(
          null,
          "Violação de chave estrangeira."
        );
        return reply.code(response.statusCode).send(response.body);
      case "P2004":
        response = HttpResponse.badRequest(null, "Ocorreu um erro interno!");
        return reply.code(response.statusCode).send(response.body);
    }
  }

  //* Erros do Zod
  if (error instanceof ZodError) {
    const formattedErrors = error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join("; ");

    const response = HttpResponse.badRequest(
      formattedErrors,
      "Erro de validação"
    );

    return reply.code(response.statusCode).send(response.body);
  }

  //* Erros não tratados
  console.error(error);

  const response = HttpResponse.serverError();
  return reply.code(response.statusCode).send(response.body);
}
