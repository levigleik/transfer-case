import { z } from "zod";
import type {
	BrandType,
	CategoryType,
	ClassificationType,
	CompanyType,
	StatusType,
} from "@/types/models";

import { VehicleSchema, type VehicleType } from "@/types/models";

export type VehicleData = VehicleType & {
	classification: ClassificationType;
	category: CategoryType;
	brand: BrandType;
	company: CompanyType;
	status: StatusType;
};

const VehicleBaseSchema = VehicleSchema.omit({
	id: true,
	createdAt: true,
	updatedAt: true,
});

export const VehiclePayloadSchema = VehicleBaseSchema.extend({
	identifier: z.coerce.number(),
	capacity: z.coerce.number(),
	doors: z.coerce.number(),
	brandId: z.coerce.number(),
	categoryId: z.coerce.number(),
	classificationId: z.coerce.number(),
	gasId: z.coerce.number(),
	companyId: z.coerce.number(),
	statusId: z.coerce.number(),
	review: z.coerce.number(),
});

export type VehiclePayload = z.infer<typeof VehiclePayloadSchema>;

export const VehicleFormSchema = VehicleBaseSchema.extend({
	identifier: z.string().min(1, "Identificador é obrigatório"),
	capacity: z.string().min(1, "Capacidade é obrigatória"),
	doors: z.string().min(1, "Nº de portas é obrigatório"),
	brandId: z.string().min(1, "Marca é obrigatória"),
	categoryId: z.string().min(1, "Categoria é obrigatória"),
	classificationId: z.string().min(1, "Classificação é obrigatória"),
	gasId: z.string().min(1, "Combustível é obrigatório"),
	companyId: z.string().min(1, "Empresa é obrigatória"),
	statusId: z.string().min(1, "Status é obrigatório"),
	review: z.string().min(1, "Revisão é obrigatória"),
	model: z.string().min(1, "Modelo é obrigatório"),
	year: z.string().length(4, "Ano deve ter 4 dígitos"),
	plate: z.string().min(7, "Placa inválida"),
	renavam: z.string().min(1, "Renavam é obrigatório"),
	chassi: z.string().min(1, "Chassi é obrigatório"),
	uf: z.string().length(2, "UF inválida"),
});

export type VehicleForm = z.infer<typeof VehicleFormSchema>;
