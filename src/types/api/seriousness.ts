import type { OccurrenceType } from "@/types/models/occurrence";

export interface SeriousnessType {
	id: number;
	level: string;
	occurences: OccurrenceType[];
	createdAt: Date;
	updatedAt: Date;
}
