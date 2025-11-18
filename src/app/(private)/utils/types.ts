import { z } from "zod";
import {
	ImageValueSchema,
	type VehicleFormSchema,
	type VehiclePayloadSchema,
} from "@/app/(private)/utils/validation";
import type {
	BrandType,
	CategoryType,
	ClassificationType,
	CompanyType,
	StatusType,
	VehicleType,
} from "@/types/models";

export type VehiclePayload = z.infer<typeof VehiclePayloadSchema>;
export type VehicleForm = z.infer<typeof VehicleFormSchema>;

export type ImageValue = z.infer<typeof ImageValueSchema>;

export type VehicleData = VehicleType & {
	classification: ClassificationType;
	category: CategoryType;
	brand: BrandType;
	company: CompanyType;
	status: StatusType;
};

export const VehicleFormImagesSchema = z.object({
	photos: z.array(ImageValueSchema).optional(),
});

export type VehicleFormImages = z.infer<typeof VehicleFormImagesSchema>;
