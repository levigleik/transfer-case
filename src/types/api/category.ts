import type { Vehicle } from "@/types/api/vehicle";

export interface Category {
	id: number;
	name: string;
	vehicles: Vehicle[];
	createdAt: Date;
	updatedAt: Date;
}
