import type { Occurrence } from "@/types/api/occurrence";

export interface Seriousness {
	id: number;
	level: string;
	occurences: Occurrence[];
	createdAt: Date;
	updatedAt: Date;
}
