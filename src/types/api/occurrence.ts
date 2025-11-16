import type { Classification } from "@/types/api/classification";
import type { Seriousness } from "@/types/api/seriousness";

export interface Occurrence {
	id: number;
	date: Date;
	description: string;
	seriousness: Seriousness;
	seriousnessId: number;
	classification: Classification;
	classificationId: number;
	createdAt: Date;
	updatedAt: Date;
}
