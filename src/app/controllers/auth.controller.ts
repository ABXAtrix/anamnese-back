import type { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import LoginAuthService from "../services/auth/LoginAuthService.service.js";
import { GenerateJWTService } from "../services/auth/GenerateJWTService.service.js";
import { MeAuthService } from "../services/auth/MeAuthService.service.js";
import HttpResponse from "../../utils/http/httpResponse.js";
import type ITokenPayload from "../interfaces/ITokenPayload.js";

@injectable()
export class AuthController {
  constructor(
    @inject("LoginAuthService")
    private loginAuthService: LoginAuthService,

    @inject("GenerateJWTService")
    private generateJWTService: GenerateJWTService,

    @inject("MeAuthService")
    private meAuthService: MeAuthService
  ) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.loginAuthService.execute(request.body);
    const { token, expiresIn } = await this.generateJWTService.execute(user);

    const response = HttpResponse.ok(
      { user, token, expiresIn },
      "Login realizado com sucesso!"
    );
    return reply.status(response.statusCode).send(response.body);
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    const decoded = await request.jwtVerify<ITokenPayload>();

    // Validação adicional de issuer e audience para maior segurança
    if (decoded.iss !== 'anamnese-api') {
      return reply.status(401).send({ message: 'Token inválido!' });
    }
    if (decoded.aud !== 'anamnese-web') {
      return reply.status(401).send({ message: 'Token inválido!' });
    }

    const user = await this.meAuthService.execute(decoded.sub);

    const response = HttpResponse.ok(user, "Usuário autenticado!");
    return reply.status(response.statusCode).send(response.body);
  }
}
