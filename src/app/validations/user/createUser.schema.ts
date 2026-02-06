import z from "zod";

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres")
    .max(16, "O nome deve ter no máximo 16 caracteres")
    .trim(),

  email: z.email("Formato de e-mail inválido").trim(),

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
    ),

  brand_id: z.uuid("O identificador da marca é inválido!").trim(),

  is_brand_owner: z.boolean(
    "O campo que informa se o usuário é o dono da marca, deve possuir um valor booleano"
  ),
});

// export type CreateUserSchema = z.infer<typeof createUserSchema>;
