import { z } from "zod";
import { DocumentationSchema } from "@/types/models";
import { FileSchema } from "@/types/models/File.schema";

const DocumentationBaseSchema = DocumentationSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const FileValueSchema = FileSchema.extend({
	id: z.string(),
	fileName: z.instanceof(File).optional(),
	path: z.string().min(1).optional(),
});

export const DocumentationPayloadSchema = DocumentationBaseSchema.extend({
	expiryAt: z.iso.datetime(),
	vehicleId: z.coerce.number(),
	fileId: z.number().optional(),
});

export const DocumentationFormSchema = DocumentationBaseSchema.extend({
	type: z.string().min(1, "Tipo é obrigatório"),
	expiryAt: z.date("Vencimento é obrigatório"),
	days: z.array(z.string()).optional(),
	file: z.any().optional(),
	fileId: z.string().optional(),
	vehicleId: z.string(),
});
