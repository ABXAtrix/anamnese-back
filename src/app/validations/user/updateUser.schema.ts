import z from "zod";

export const updateUserSchema = z.object({
  id: z.string("O ID do usuário deve ser uma string").trim(),

  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(16, "O nome deve ter no máximo 16 caracteres")
    .trim()
    .optional(),

  email: z.email("Formato de e-mail inválido").trim().optional(),

  password: z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .max(32, "A senha deve ter no máximo 32 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[^A-Za-z0-9]/,
      "A senha deve conter pelo menos um caractere especial"
    )
    .optional(),
});
