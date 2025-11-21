import { z } from "zod";

const envSchema = z.object({
	NODE_ENV: z
		.enum(["development", "production", "test"])
		.default("development"),
	NEXT_PUBLIC_API_URL: z.url().default("http://localhost:4000"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
	console.error(
		"❌ Erro de validação nas variáveis de ambiente:",
		parsedEnv.error.issues,
	);

	throw new Error(
		"Variáveis de ambiente faltando ou inválidas. Verifique o log acima.",
	);
}

export const env = parsedEnv.data;

export type Env = z.infer<typeof envSchema>;
