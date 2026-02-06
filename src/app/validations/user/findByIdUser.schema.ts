import z from "zod";

export const findByIdUserSchema = z.object({
    id: z
        .string("O ID da marca deve ser uma string")
        .trim()
})