import { z } from "zod";
import { DocumentationSchema } from "@/types/models";

const DocumentationBaseSchema = DocumentationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const FileValueSchema = z
	.object({
		id: z.string(),
		file: z.instanceof(File).optional(),
		url: z.string().min(1).optional(),
		name: z.string().optional(),
	})
	.refine((data) => data.file || data.url, {
		message: "É necessário ter pelo menos 'file' ou 'url'.",
	});

export const DocumentationPayloadSchema = DocumentationBaseSchema.extend({
	expiryAt: z.iso.datetime(),
	vehicleId: z.coerce.number(),
});

export const DocumentationFormSchema = DocumentationBaseSchema.extend({
	type: z.string().min(1, "Tipo é obrigatório"),
	expiryAt: z.string().min(1, "Vencimento é obrigatório"),
	days: z.array(z.string()).optional(),
	document: z.string(),
	vehicleId: z.string(),
});
