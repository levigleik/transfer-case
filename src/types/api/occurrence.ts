import type { ClassificationType } from "@/types/models/classification";
import type { SeriousnessType } from "@/types/models/seriousness";

export interface OccurrenceType {
	id: number;
	date: Date;
	description: string;
	seriousness: SeriousnessType;
	seriousnessId: number;
	classification: ClassificationType;
	classificationId: number;
	createdAt: Date;
	updatedAt: Date;
}
