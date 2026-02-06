import type { FastifyReply, FastifyRequest } from "fastify";
import { inject, injectable } from "tsyringe";
import LoginAuthService from "../services/auth/LoginAuthService.service.js";
import { GenerateJWTService } from "../services/auth/GenerateJWTService.service.js";
import { RefreshTokenService } from "../services/auth/RefreshTokenService.service.js";
import { LogoutService } from "../services/auth/LogoutService.service.js";
import { MeAuthService } from "../services/auth/MeAuthService.service.js";
import { ForgotPasswordService } from "../services/auth/ForgotPasswordService.service.js";
import { ResetPasswordService } from "../services/auth/ResetPasswordService.service.js";
import HttpResponse from "../../utils/http/httpResponse.js";
import type ITokenPayload from "../interfaces/ITokenPayload.js";

// Login - autenticação com email/password + retorno de JWT
// Refresh Token - renovação do token
// Logout - invalidação do token
// Me - retornar dados do usuário autenticado
// Forgot/Reset Password - recuperação de senha

@injectable()
export class AuthController {
  constructor(
    @inject("LoginAuthService")
    private loginAuthService: LoginAuthService,

    @inject("GenerateJWTService")
    private generateJWTService: GenerateJWTService,

    @inject("RefreshTokenService")
    private refreshTokenService: RefreshTokenService,

    @inject("LogoutService")
    private logoutService: LogoutService,

    @inject("MeAuthService")
    private meAuthService: MeAuthService,

    @inject("ForgotPasswordService")
    private forgotPasswordService: ForgotPasswordService,

    @inject("ResetPasswordService")
    private resetPasswordService: ResetPasswordService
  ) {}

  async login(request: FastifyRequest, reply: FastifyReply) {
    const user = await this.loginAuthService.execute(request.body);
    const { token, refreshToken, expiresIn } = await this.generateJWTService.execute(user);

    const response = HttpResponse.ok(
      { user, token, refreshToken, expiresIn },
      "Login realizado com sucesso!"
    );
    return reply.status(response.statusCode).send(response.body);
  }

  async refreshToken(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = request.body as { refreshToken: string };

    const result = await this.refreshTokenService.execute(refreshToken);

    const response = HttpResponse.ok(result, "Token renovado com sucesso!");
    return reply.status(response.statusCode).send(response.body);
  }

  async logout(request: FastifyRequest, reply: FastifyReply) {
    const { refreshToken } = request.body as { refreshToken: string };

    await this.logoutService.execute(refreshToken);

    const response = HttpResponse.ok(null, "Logout realizado com sucesso!");
    return reply.status(response.statusCode).send(response.body);
  }

  async me(request: FastifyRequest, reply: FastifyReply) {
    const decoded = await request.jwtVerify<ITokenPayload>();
    const user = await this.meAuthService.execute(decoded.sub);

    const response = HttpResponse.ok(user, "Usuário autenticado!");
    return reply.status(response.statusCode).send(response.body);
  }

  async forgotPassword(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body as { email: string };

    await this.forgotPasswordService.execute(email);

    const response = HttpResponse.ok(null, "Se o e-mail existir, você receberá instruções para redefinir sua senha.");
    return reply.status(response.statusCode).send(response.body);
  }

  async resetPassword(request: FastifyRequest, reply: FastifyReply) {
    const { token, password } = request.body as { token: string; password: string };

    await this.resetPasswordService.execute({ token, password });

    const response = HttpResponse.ok(null, "Senha redefinida com sucesso!");
    return reply.status(response.statusCode).send(response.body);
  }
}
