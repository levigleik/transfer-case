import type { Vehicle } from "@/types/api/vehicle";

export interface Brand {
	id: number;
	name: string;
	vehicles: Vehicle[];
	createdAt: Date;
	updatedAt: Date;
}
