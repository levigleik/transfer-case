import type { Occurrence } from "@/types/api/occurrence";

export interface Classification {
	id: number;
	description: string;
	occurences: Occurrence[];
	createdAt: Date;
	updatedAt: Date;
}
