import type { VehicleType } from "@/types/models/vehicle";

export interface BrandType {
	id: number;
	name: string;
	vehicles: VehicleType[];
	createdAt: Date;
	updatedAt: Date;
}
