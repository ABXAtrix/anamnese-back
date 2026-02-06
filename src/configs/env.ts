import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(10),
  BLOB_READ_WRITE_TOKEN: z
    .string()
    .min(1, "BLOB_READ_WRITE_TOKEN é obrigatório"),
  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET deve ter pelo menos 32 caracteres"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  FRONTEND_URL: z.string().min(10),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Erro na validação das variáveis de ambiente:\n");

  parsedEnv.error.issues.forEach(({ path, message }) => {
    console.error(`• ${path.join(".")}: ${message}`);
  });

  throw new Error("Configuração de ambiente inválida");
}

export const env = parsedEnv.data;
