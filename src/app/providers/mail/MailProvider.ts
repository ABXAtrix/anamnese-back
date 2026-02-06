import { injectable } from "tsyringe";
import type { IMailProvider, ISendMailDTO } from "./IMailProvider.js";
import { AppError } from "../../errors/appError.js";

@injectable()
export class MailProvider implements IMailProvider {
  async sendMail({ to, subject, body }: ISendMailDTO): Promise<void> {
    try {
      await fetch(process.env.EMAIL_API_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to,
          subject,
          body,
        }),
      });
      return
    } catch (error) {
      //TODO: Adicionar log de erro
      new AppError("Erro ao enviar e-mail", 500);
    }
  }
}
