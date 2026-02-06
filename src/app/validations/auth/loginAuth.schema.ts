import z from "zod";

export const loginAuthSchema = z.object({
  email: z.email("Formato de e-mail inválido").trim(),

  password: z
    .string()
    .min(1, "A senha é obrigatória"),
});
