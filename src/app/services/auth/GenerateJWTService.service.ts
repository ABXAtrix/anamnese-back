import { injectable } from "tsyringe";
import type IUser from "../../interfaces/IUser.js";
import type ITokenPayload from "../../interfaces/ITokenPayload.js";
import jwt from "jsonwebtoken";
import { env } from "../../../configs/env.js";

@injectable()
export class GenerateJWTService {
  async execute(user: Omit<IUser, "password">): Promise<{ token: string; expiresIn: string }> {
    const payload: ITokenPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as any,
      algorithm: 'HS512', // Algoritmo mais forte que HS256
      issuer: 'anamnese-api', // Identifica quem emitiu o token
      audience: 'anamnese-web', // Para quem o token é destinado
    });

    return {
      token,
      expiresIn: env.JWT_EXPIRES_IN,
    };
  }
}
