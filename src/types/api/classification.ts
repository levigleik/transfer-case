import type { OccurrenceType } from "@/types/models/occurrence";

export interface ClassificationType {
	id: number;
	description: string;
	occurences: OccurrenceType[];
	createdAt: Date;
	updatedAt: Date;
}
