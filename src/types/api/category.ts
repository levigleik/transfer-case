import type { VehicleType } from "@/types/models/vehicle";

export interface CategoryType {
	id: number;
	name: string;
	vehicles: VehicleType[];
	createdAt: Date;
	updatedAt: Date;
}
