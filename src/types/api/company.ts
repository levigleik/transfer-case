import type { VehicleType } from "@/types/models/vehicle";

export interface CompanyType {
	id: number;
	name: string;
	cnpj: string;
	vehicles: VehicleType[];
	createdAt: Date;
	updatedAt: Date;
}
